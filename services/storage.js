export const storeId = (accountId) => {
  sessionStorage.setItem('cv/account_id', accountId)
}

export const retriveId = () => {
  return sessionStorage.getItem('cv/account_id')
}

export const clearId = () => sessionStorage.removeItem('cv/account_id')
