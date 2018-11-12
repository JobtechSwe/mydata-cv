import React, { createContext, useState, useEffect } from 'react'
import { getId, getAccessToken, setId, setAccessToken } from './storage'
import { write, read } from './operator'

const StoreContext = createContext({})

const actions = {
  updateTokenAndAccountId: (token, accountId) => (old) => ({
    ...old,
    token,
    accountId
  })
}

const isBrowser = () => typeof window !== 'undefined'

const initialState = {
  accountId: isBrowser() ? getId() : undefined,
  token: isBrowser() ? getAccessToken() : undefined,
  data: null
}

const StoreProvider = ({ ...props }) => {
  const [{ accountId, token, data }, setState] = useState(initialState)

  useEffect(async () => {
    if (accountId) {
      console.log('loading data')
      const retrievedData = await read('/')
      setState(old => ({
        ...old,
        data: retrievedData
      }))
    }
  }, [accountId])

  const stateActions = {
    updateTokenAndAccountId: (token, id) => {
      console.log('updating token and account id...')
      setAccessToken(token)
      setId(id)
      return setState(actions.updateTokenAndAccountId(token, id))
    },
    updateEducationEntry: async (entry) => {
      const newEducation = data.education.map(x =>
        x.id === entry.id
          ? Object.assign({}, x, entry)
          : x)

      await write('/education', newEducation)
      setState(old => ({
        ...old,
        data: { ...old.data, education: newEducation }
      }))
    },
    updateExperienceEntry: async (entry) => {
      const newExperience = data.experience.map(x =>
        x.id === entry.id
          ? Object.assign({}, x, entry)
          : x)

      await write('/experience', newExperience)
      setState(old => ({
        ...old,
        data: { ...old.data, experience: newExperience }
      }))
    },
    updateLanguageEntry: async (entry) => {
      const newLanguages = data.languages.map(x =>
        x.id === entry.id
          ? Object.assign({}, x, entry)
          : x)

      await write('/languages', newLanguages)
      setState(old => ({
        ...old,
        data: { ...old.data, languages: newLanguages }
      }))
    }
  }

  return <StoreContext.Provider value={[{ accountId, token, data }, stateActions]}>{props.children}</StoreContext.Provider>
}

export {
  StoreProvider,
  StoreContext
}
