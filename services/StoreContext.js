import React, { createContext, useState, useEffect, useReducer } from 'react'
import { write, read } from './operator'
import * as storage from './storage'

const StoreContext = createContext({})

const reducer = (state, action) => {
  switch (action.type) {
    case 'add experience':
      return { ...state,
        experience: state.experience
          ? state.experience.concat(action.payload.entry)
          : [action.payload.entry]
      }
    case 'update experience':
      return { ...state,
        experience: state.experience.map((x, i) => action.payload.index !== i ? x : Object.assign({}, x, action.payload.entry))
      }
    case 'add language':
      return { ...state,
        languages: state.languages
          ? state.languages.concat(action.payload.entry)
          : [action.payload.entry]
      }
    case 'update language':
      return { ...state,
        languages: state.languages.map((x, i) => action.payload.index !== i ? x : Object.assign({}, x, action.payload.entry))
      }
    case 'add education':
      return { ...state,
        education: state.education
          ? state.education.concat(action.payload.entry)
          : [action.payload.entry]
      }
    case 'update education':
      return { ...state,
        education: state.education.map((x, i) => action.payload.index !== i ? x : Object.assign({}, x, action.payload.entry))
      }
    case 'init':
      return action.payload
    default:
      throw Error('Action type has to be specified')
  }
}

const StoreProvider = ({ ...props }) => {
  const [data, dispatch] = useReducer(reducer, {})
  const [loaded, setLoaded] = useState(false)
  const [token, setToken] = useState(undefined)

  const afterLogin = (thing) => {
    storage.setAccessToken(thing)
    setToken(thing)
  }

  useEffect(() => {
    const tokenFromStorage = storage.getAccessToken()
    if (tokenFromStorage) {
      setToken(storage.getAccessToken())
    }
  }, [])

  useEffect(async () => {
    if (!token) {
      return
    }
    const retrievedData = await read('/', token)
    dispatch({ type: 'init', payload: retrievedData })
    setLoaded(true)
  }, [token])

  useEffect(async () => {
    if (loaded) {
      await write('/languages', data.languages, token)
    }
  }, [data.languages])

  useEffect(async () => {
    if (loaded) {
      await write('/education', data.education, token)
    }
  }, [data.education])

  useEffect(async () => {
    if (loaded) {
      await write('/experience', data.experience, token)
    }
  }, [data.experience])

  return <StoreContext.Provider value={[data, dispatch, afterLogin]}>{props.children}</StoreContext.Provider>
}

export {
  StoreProvider,
  StoreContext
}
