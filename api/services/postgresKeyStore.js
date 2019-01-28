const pg = require('../adapters/postgres')
const redis = require('../adapters/redis')
const { camelCase } = require('changecase-objects')

async function loadFromPostgres ({ use, kid }) {
  const col = kid ? 'kid' : 'use'
  const val = kid || use
  const { rows } = await pg.query(`SELECT * FROM keys WHERE ${col} = $1`, [val])
  return rows.map(r => camelCase(r))
}

async function loadFromRedis ({ use, kid }) {
  let pattern
  if (kid && use) pattern = `key|${use}|${kid}`
  else if (kid) pattern = `key|*|${kid}`
  else if (use) pattern = `key|${use}|*`
  else pattern = 'key|*'
  const keys = await redis.search(pattern)
  return keys.map(k => JSON.parse(k))
}

async function load ({ use, kid }) {
  const [perm, temp] = await Promise.all([
    loadFromPostgres({ use, kid }),
    loadFromRedis({ use, kid })
  ])
  return perm.concat(temp)
}
async function save ({ kid, use, publicKey, privateKey }) {
  await pg.query(`INSERT INTO keys (kid, use, public_key, private_key) VALUES ($1, $2, $3, $4)`, [ kid, use, publicKey, privateKey ])
  return { kid, use, publicKey, privateKey }
}
async function remove (kid) {
  await pg.query(`DELETE FROM keys WHERE kid = $1`, [ kid ])
}
async function saveTemp ({ kid, use, publicKey, privateKey }, ttl) {
  await redis.set(`key|${use}|${kid}`, JSON.stringify({ kid, use, publicKey, privateKey }), 'PX', ttl)
  return { kid, use, publicKey, privateKey }
}
async function removeTemp (kid) {
  const keys = await redis.keys(`key|*|${kid}`)
  await Promise.all(keys.map(k => redis.del(k)))
}

module.exports = { load, save, saveTemp, remove, removeTemp }
