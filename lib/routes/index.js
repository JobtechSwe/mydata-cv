const { Router } = require('express')
const router = Router()

router.get('/', (req, res, next) => {
  res.send(require(`${process.cwd()}/package.json`))
})

module.exports = router
