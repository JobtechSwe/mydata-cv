import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig: { operatorUrl } } = getConfig()

export async function requestConsent (accountId) {
  const consentRequest = {
    account_id: accountId,
    client_id: 'changeMe',
    scope: [
      'career'
    ],
    description: 'MyData CV example service requires this consent in order to provide value to the user'
  }
  return axios.post(`${operatorUrl}/consents`, consentRequest)
}

export async function getConsent (consentId) {
  return {}
}