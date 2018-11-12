function getOperatorUrl (env) {
  if (env === 'production') {
    return 'https://operator.mydata.work'
  } else if (env === 'test') {
    return 'https://test.operator.mydata.work'
  } else {
    return 'http://localhost:3000'
  }
}

function getRedirectUri (env) {
  if (env === 'production') {
    return 'https://cv.work/return'
  } else if (env === 'test') {
    return 'https://test.cv.work/return'
  } else {
    return 'http://localhost:4000/return'
  }
}

module.exports = {
  publicRuntimeConfig: {
    operatorUrl: getOperatorUrl(process.env.NODE_ENV),
    redirectUri: getRedirectUri(process.env.NODE_ENV),
    clientId: 'foooooo'
  }
}
