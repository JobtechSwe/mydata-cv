import * as operator from '../../services/operator'
import axios from 'axios'
jest.mock('axios')

describe('operator', () => {
  afterEach(() => {
    operator.clear()
  })

  describe('#login', () => {
    it('redirects to operator login page with oauth query', () => {
      window.location.assign = jest.fn()

      operator.init({ operatorUrl: '111111', redirectUri: '222222', clientId: 'bestclientever' })
      operator.login()

      expect(window.location.assign)
        .toHaveBeenCalledWith('111111/login?redirect_uri=222222&client_id=bestclientever')
    })
  })

  describe('#requestConsent', () => {
    beforeEach(() => {
      operator.init({ operatorUrl: 'aTotallyLegitOperatorUrl' })
    })

    it('posts to operator', async () => {
      const response = {
        status: '201',
        data: {
          data: { id: '54524' },
          links: { self: '/asdads/' }
        }
      }
      axios.post.mockResolvedValue(response)
      await operator.requestConsent('my-fantastic-account-id')

      expect(axios.post)
        .toHaveBeenCalledWith('aTotallyLegitOperatorUrl/api/consents',
          { account_id: 'my-fantastic-account-id',
            client_id: 'cv',
            scope: [
              'career'
            ],
            description: 'MyData CV example service requires this consent in order to provide value to the user'
          })
    })

    it('unwraps response and returns data', async () => {
      const response = {
        status: '201',
        data: {
          data: { id: '54524' },
          links: { self: '/asdads/' }
        }
      }
      axios.post.mockResolvedValue(response)
      const result = await operator.requestConsent('my-fantastic-account-id')
      expect(result).toEqual({
        data: { id: '54524' },
        links: { self: '/asdads/' }
      })
    })
  })

  describe('#getConsent', () => {
    beforeEach(() => {
      operator.init({ operatorUrl: 'aTotallyLegitOperatorUrl' })
    })

    it('does get request to operator using the link provided', async () => {
      const response = {
        status: '201',
        data: {
          data: { id: 'asdsd', status: 'approved' },
          links: { self: 'asd' }
        }
      }
      axios.get.mockResolvedValue(response)
      await operator.getConsent('/consents/abc123')

      expect(axios.get)
        .toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents/abc123')
    })

    it('does not do request to operator if consentId is undefined', async () => {
      try {
        await operator.getConsent(undefined)
      } catch (e) { }
      expect(axios.get).not.toHaveBeenCalled()
    })

    it('rejects if consentId is undefined', async () => {
      await expect(operator.getConsent(undefined))
        .rejects.toEqual(new Error('Cannot get undefined consent'))
    })
  })
})
