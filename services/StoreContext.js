import React, { createContext, useState, useEffect, useReducer } from 'react'
import * as storage from './storage'
import { read } from './data'

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
    case 'update baseData':
      return { ...state,
        baseData: action.payload
      }
    case 'init':
      return action.payload
    case 'clear':
      return {}
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

  useEffect(() => {
    if (!token) { return }

    read('/', token)
      .then(retrievedData => {
        dispatch({ type: 'init', payload: retrievedData })
        setLoaded(true)
        console.log('has loaded data', retrievedData)
      })
      .catch(error => {
        console.error('could not load data', error)
      })
  }, [token])

  return <StoreContext.Provider value={[data, dispatch, afterLogin, loaded, setLoaded]}>{props.children}</StoreContext.Provider>
}

export {
  StoreProvider,
  StoreContext
}
