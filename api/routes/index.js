const { Router } = require('express')
const router = Router()
const { get } = require('../services/consents')

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

  router.get('/approved/:id', async (req, res, next) => {
    const result = get(req.params.id)
    if (result) {
      res.send(result)
    } else {
      res.sendStatus(404)
    }
  })
  return router
}
