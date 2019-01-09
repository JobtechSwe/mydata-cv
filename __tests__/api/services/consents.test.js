const { createRequestWithExpiry } = require('../../../api/services/consents')

describe('createRequestWithExpiry', () => {
  it('has expiry', () => {
    const nowMock = () => 26743223 // timestamp in milliseconds
    const duration = 60

    const request = createRequestWithExpiry(nowMock, duration)

    expect(request.expiry).toBe(26743223 / 1000 + 60)
  })
})
