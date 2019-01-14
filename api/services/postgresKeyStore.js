const { query } = require('../adapters/postgres')
const { camelCase } = require('changecase-objects')

async function load ({ use, kid }) {
  const col = kid ? 'kid' : 'use'
  const val = kid || use
  console.log(`SELECT * FROM keys WHERE ${col} = $1`, [val])
  const { rows } = await query(`SELECT * FROM keys WHERE ${col} = $1`, [val])
  return rows.map(r => camelCase(r))
}
async function save ({ kid, use, publicKey, privateKey }) {
  await query(`INSERT INTO keys (kid, use, public_key, private_key) VALUES ($1, $2, $3, $4)`, [ kid, use, publicKey, privateKey ])
  return { kid, use, publicKey, privateKey }
}
async function remove (kid) {
  await query(`DELETE FROM keys WHERE kid = $1`, [ kid ])
}

module.exports = { load, save, remove }
