import React, { createContext } from 'react'

const UserContext = createContext({})

const Provider = ({ accountId, ...props }) => {
  return <UserContext.Provider value={{ accountId: accountId }}>{props.children}</UserContext.Provider>
}

export {
  UserContext,
  Provider
}
