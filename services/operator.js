import axios from 'axios'

const config = {
  token: null,
  accountId: null,
  clientId: null,
  operatorUrl: null,
  redirectUri: null,
  initialized: false
}

const isInitialized = () => config.initialized

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

const read = async (path) => {
  const response = await axios.get(`${config.operatorUrl}/api/accounts/${encodeURIComponent(config.accountId)}/data${path}`)
  return response.data.data
}

const write = async (path, data) => {
  const url = `${config.operatorUrl}/api/accounts/${encodeURIComponent(config.accountId)}/data${path}`
  try {
    await axios.put(url, data)
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

const finishLogin = ({ accountId, token }) => {
  config.accountId = accountId
  config.token = token
}

export {
  login,
  finishLogin,
  write,
  read,
  getConsent,
  requestConsent,
  isInitialized,
  init,
  clear
}
