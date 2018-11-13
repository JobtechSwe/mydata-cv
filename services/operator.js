import axios from 'axios'
import jwt from 'jsonwebtoken'

const config = {
  clientId: null,
  operatorUrl: null,
  redirectUri: null,
  initialized: false
}

const isInitialized = () => config.initialized

const getAccountIdFromToken = (token) => {
  const { account } = jwt.decode(token)
  return account.id
}

const init = ({ clientId, operatorUrl, redirectUri }) => {
  if (config.initialized) {
    throw Error('Operator has already been initialized')
  }
  config.clientId = clientId
  config.operatorUrl = operatorUrl
  config.redirectUri = redirectUri
  config.initialized = true
}

const clear = () => {
  Object.keys(config).forEach(k => {
    config[k] = undefined
  })
  config.initialized = false
}

const requestConsent = async (accountId) => {
  const consentRequest = {
    account_id: accountId,
    client_id: 'cv',
    scope: [
      'career'
    ],
    description: 'MyData CV example service requires this consent in order to provide value to the user'
  }

  try {
    const response = await axios.post(`${config.operatorUrl}/api/consents`, consentRequest)
    return response.data
  } catch (error) {
    throw error
  }
}

const getConsent = async (link) => {
  if (!link) throw new Error('Cannot get undefined consent')

  const response = await axios.get(`${config.operatorUrl}${link}`)
  if (response.data.data.status === 'approved') return response.data

  const wait = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))

  await wait(5000)
  return getConsent(link)
}

const read = async (path, token) => {
  if (!config.initialized) {
    throw Error('operator is not initialized')
  }
  if (!token) {
    console.error('config', config)
    throw Error('token is not set')
  }
  const accountId = getAccountIdFromToken(token)

  console.log(`attempting to read data for accountId ${accountId}`)
  const response = await axios.get(
    `${config.operatorUrl}/api/accounts/${encodeURIComponent(accountId)}/data${path}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  )
  return response.data.data
}

const write = async (path, data, token) => {
  if (!config.initialized) {
    throw Error('operator is not initialized')
  }
  if (!token) {
    console.error('config', config)
    throw Error('token is not set')
  }
  console.log('writing data', data)
  const accountId = getAccountIdFromToken(token)
  const url = `${config.operatorUrl}/api/accounts/${encodeURIComponent(accountId)}/data${path}`
  try {
    await axios.put(url, data,
      { headers: { 'Authorization': `Bearer ${token}` } })
  } catch (err) {
    throw err
  }
}

const login = () => {
  window.location.assign(`${config.operatorUrl}/login?redirect_uri=${config.redirectUri}&client_id=${config.clientId}`)

  /* Omitted:
    response_type=code
    &scope=myapi-read%20myapi-write
    &state=af0ifjsldkj
  */
}

export {
  login,
  write,
  read,
  getConsent,
  requestConsent,
  isInitialized,
  init,
  clear
}
