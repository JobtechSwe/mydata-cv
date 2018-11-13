import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import { StoreContext } from '../services/StoreContext'

export default () => {
  const [,, afterLogin] = useContext(StoreContext)

  useEffect(() => {
    afterLogin(Router.query.access_token)

    Router.push({
      pathname: '/profile'
    })
  }, [])

  return (
    <p>...</p>
  )
}
