export const setId = (accountId) => {
  sessionStorage.setItem('cv/account_id', accountId)
}

export const getId = () => {
  return sessionStorage.getItem('cv/account_id')
}

export const clearId = () => sessionStorage.removeItem('cv/account_id')

export const setAccessToken = (access_token) => {
  sessionStorage.setItem('cv/access_token', access_token)
}

export const getAccessToken = () => {
  return sessionStorage.getItem('cv/access_token')
}

export const clearAccessToken = () => sessionStorage.removeItem('cv/access_token')
