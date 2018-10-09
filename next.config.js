function getEnvVars (env) {
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
    operatorUrl: getEnvVars(process.env.NODE_ENV)
  }
}
