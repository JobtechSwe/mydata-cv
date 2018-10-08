import * as operator from '../../services/operator'
import axios from 'axios'
jest.mock('axios')

import React from 'react'

describe('operator', () => {
  describe('#requestConsent', () => {
    it('posts to operator', async () => {

      operator.requestConsent({ id: 'my-fantastic-data-id' })

      expect(axios.post)
        .toHaveBeenCalledWith('aTotallyLegitOperatorUrl/consents', { id: 'my-fantastic-data-id' })
    })
  })
})
