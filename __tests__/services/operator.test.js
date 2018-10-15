import * as operator from '../../services/operator'
import axios from 'axios'
jest.mock('axios')

describe('operator', () => {
  describe('#requestConsent', () => {
    it('posts to operator', async () => {
      const response = {
        status: '201',
        data: {
          data: { id: '54524'},
          links: { self: '/asdads/' }
        }
      }
      axios.post.mockResolvedValue(response)
      await operator.requestConsent('my-fantastic-account-id')

      expect(axios.post)
        .toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents',
          { account_id: 'my-fantastic-account-id',
            client_id: 'changeMe',
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
          data: { id: '54524'},
          links: { self: '/asdads/' }
        }
      }
      axios.post.mockResolvedValue(response)
      const result = await operator.requestConsent('my-fantastic-account-id')
      expect(result).toEqual({
        data: { id: '54524'},
        links: { self: '/asdads/' }
      })
    })
  })

  describe('#getConsent', () => {
    it('does get request to operator using the link provided', async () => {
      const response = {
        status: '201',
        data: {
          data: { id: 'asdsd', status: 'approved'},
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
