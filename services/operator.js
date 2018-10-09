import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig: { operatorUrl } } = getConfig()

export async function requestConsent (consentRequest) {
  return axios.post(`${operatorUrl}/consents`, consentRequest)
}
