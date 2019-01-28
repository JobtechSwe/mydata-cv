function getOperatorUrl (env) {
  if (env === 'production') {
    return 'https://operator.mydata.work'
  } else if (env === 'test') {
    return 'https://test.operator.mydata.work'
  } else {
    return 'http://localhost:3000'
  }
}

module.exports = {
  publicRuntimeConfig: {
    operatorUrl: getOperatorUrl(process.env.NODE_ENV),
    clientId: 'foooooo'
  }
}
