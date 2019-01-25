const { Router } = require('express')
const router = Router()
const { getConsentRequest } = require('../services/db')
const { createDefaultRequest } = require('../services/consents')

module.exports = operator => {
  router.get('/', (req, res, next) => {
    res.send(require(`${process.cwd()}/package.json`))
  })

  router.post('/auth', async (req, res, next) => {
    const request = createDefaultRequest(3600 * 24 * 31)
    try {
      const pendingRequest = await operator.consents.request(request)
      res.send(pendingRequest)
    } catch (error) {
      console.error('Error when doing consent request', error)
      next(error)
    }
  })

  // TODO: This is not very secure. Anyone with the id can race the GET-request and steal the secret token.
  // Instead, we should probably associate the consent request with a session and then log in that session once it's approved.
  router.get('/approved/:id', async (req, res, next) => {
    const result = getConsentRequest(req.params.id)
    if (result) {
      res.send({ accessToken: result.id }) // TODO: Use actual accessToken instead of consentId from Operator...?
    } else {
      res.sendStatus(404)
    }
  })

  router.get('/data', async (req, res, next) => {
    const consentId = req.headers.authorization.split('Bearer ')[1]

    if (!consentId) {
      return next(Error('Invalid authorization header'))
    }

    try {
      // const data = await operator.data.read(consentId, '/') TODO: Implement
      const data = {
        baseData: {
          firstName: 'Adam',
          lastName: 'Naeslund',
          headline: 'Looking for opportunities'
        },
        education: [
          {
            schoolName: 'Uppsala University',
            fieldOfStudy: 'Computer Science'
          }
        ],
        languages: [
          {
            languageName: 'Swedish',
            proficiency: 'Native'
          },
          {
            languageName: 'English',
            proficiency: 'Fluent'
          },
          {
            languageName: 'Javascript',
            proficiency: 'Fluent'
          }
        ],
        experience: [
          {
            employer: 'Iteam',
            title: 'Developer',
            fromDate: '2017',
            toDate: '2019',
            description: 'Developing software and other various things'
          },
          {
            employer: 'Posten AB',
            title: 'Mail Delivery Technican Assistent Manager',
            fromDate: '2012',
            toDate: '2017',
            description: 'Did things'
          }
        ]
      }
      res.send(data)
    } catch (error) {
      next(error)
    }
  })
  return router
}
