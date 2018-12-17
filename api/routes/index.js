const { Router } = require('express')
const router = Router()

module.exports = operator => {
  router.get('/', (req, res, next) => {
    res.send(require(`${process.cwd()}/package.json`))
  })

  router.post('/auth', async (req, res, next) => {
    const consentRequest = await operator.request({
      client_id: 'asdasd',
      scope: ['allyourbasearebelongtous']
    })
    res.send(consentRequest)
  })

  return router
}
