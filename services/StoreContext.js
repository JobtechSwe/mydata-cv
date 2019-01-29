import React, { createContext, useEffect, useReducer } from 'react'
import * as storage from './storage'
import { read } from './data'

const StoreContext = createContext({})

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPERIENCE':
      return { ...state,
        experience: state.experience
          ? state.experience.concat(action.payload.entry)
          : [action.payload.entry]
      }
    case 'UPDATE_EXPERIENCE':
      return { ...state,
        experience: state.experience.map((x, i) => action.payload.index !== i ? x : Object.assign({}, x, action.payload.entry))
      }
    case 'ADD_LANGUAGE':
      return { ...state,
        languages: state.languages
          ? state.languages.concat(action.payload.entry)
          : [action.payload.entry]
      }
    case 'UPDATE_LANGUAGE':
      return { ...state,
        languages: state.languages.map((x, i) => action.payload.index !== i ? x : Object.assign({}, x, action.payload.entry))
      }
    case 'ADD_EDUCATION':
      return { ...state,
        education: state.education
          ? state.education.concat(action.payload.entry)
          : [action.payload.entry]
      }
    case 'UPDATE_EDUCATION':
      return { ...state,
        education: state.education.map((x, i) => action.payload.index !== i ? x : Object.assign({}, x, action.payload.entry))
      }
    case 'UPDATE_BASEDATA':
      return { ...state,
        baseData: action.payload
      }
    case 'LOAD_DATA':
      return { ...state, loaded: true, ...action.payload }
    case 'CLEAR':
      return { loaded: false }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    default:
      throw Error('Action type has to be specified')
  }
}

const StoreProvider = ({ ...props }) => {
  const [data, dispatch] = useReducer(reducer, { loaded: false })

  useEffect(() => {
    const tokenFromStorage = storage.getAccessToken()
    if (tokenFromStorage && !data.token) {
      dispatch({ type: 'SET_TOKEN', payload: tokenFromStorage })
    }
  }, [])

  useEffect(() => {
    if (!data.token) { return }

    read('/', data.token)
      .then(retrievedData => {
        dispatch({ type: 'LOAD_DATA', payload: retrievedData })
      })
      .catch(error => {
        console.error('could not LOAD_DATA', error)
      })
  }, [data.token])

  return <StoreContext.Provider value={[data, dispatch]}>{props.children}</StoreContext.Provider>
}

export {
  StoreProvider,
  StoreContext
}
