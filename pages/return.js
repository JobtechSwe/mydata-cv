import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import { StoreContext } from '../services/StoreContext'
import { finishLogin } from '../services/operator'

export default () => {
  const [, { updateTokenAndAccountId }] = useContext(StoreContext)

  useEffect(() => {
    const { access_token, account_id } = Router.query
    updateTokenAndAccountId(access_token, account_id)
    finishLogin({ token: access_token, accountId: account_id })

    Router.push({
      pathname: '/profile'
    })
  }, [])

  return (
    <p>...</p>
  )
}
