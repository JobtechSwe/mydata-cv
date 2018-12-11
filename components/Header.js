import React, { useContext, useState } from 'react'
import { Box, Typography, Button, Input } from '@smooth-ui/core-sc'
import { StoreContext } from '../services/StoreContext'

const emptyDraft = {
  firstName: '',
  lastName: '',
  headline: ''
}

export default () => {
  const [{ baseData }, dispatch] = useContext(StoreContext)
  const [draft, setDraft] = useState(undefined)

  const changeHandler = e => {
    e.preventDefault()
    const value = e.target.value
    const field = e.target.name
    setDraft(old => ({ ...old, [field]: value }))
  }

  const save = () => {
    dispatch({ type: 'update baseData', payload: draft })
    setDraft(undefined)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      save()
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={40} mb={20}>
      <Box width={200} height={200} backgroundColor="light" />
      <Typography variant="h3" mt={20}>
        { baseData
          ? draft
            ? <Input value={draft.firstName} onChange={changeHandler} name="firstName" placeholder="First name" onKeyPress={handleKeyPress} />
            : baseData.firstName || 'First name'
          : 'First name'
        }
        &nbsp;
        { baseData
          ? draft
            ? <Input value={draft.lastName} onChange={changeHandler} name="lastName" placeholder="Last name" onKeyPress={handleKeyPress} />
            : baseData.lastName || 'Last name'
          : 'Last name'
        }
      </Typography>
      <Box mb={1}>
        { baseData
          ? draft
            ? <Input value={draft.headline} onChange={changeHandler} name="headline" placeholder="Your headline here" onKeyPress={handleKeyPress} />
            : `"${baseData.headline}"` || 'Your headline here'
          : 'Your headline here'
        }
      </Box>
      <Button size="sm" variant={draft ? 'success' : 'light'} mb={1} onClick={draft
        ? () => save()
        : () => setDraft(baseData ? Object.assign({}, emptyDraft, baseData) : emptyDraft)
      }>
        { draft ? 'Save' : 'Edit'}
      </Button>
    </Box>)
}
