import * as operator from '../../services/operator'
import axios from 'axios'
jest.mock('axios')
jest.useFakeTimers()

describe('operator', () => {
  describe('#requestConsent', () => {
    it('posts to operator', async () => {
      await operator.requestConsent('my-fantastic-data-id')

      expect(axios.post)
        .toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents',
          { account_id: 'my-fantastic-data-id',
            client_id: 'changeMe',
            scope: [
              'career'
            ],
            description: 'MyData CV example service requires this consent in order to provide value to the user'
         })
    })
  })

  describe('#getConsent', () => {
    it('does get request to operator', async () => {
      await operator.getConsent('12345')

      expect(axios.get)
        .toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents?id=12345')
    })
  })
})
