import React, { useContext } from 'react'
import { Box, Typography } from '@smooth-ui/core-sc'
import { StoreContext } from '../services/StoreContext'

export default () => {
  const [{ baseData }] = useContext(StoreContext)
  if (!baseData) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={40}>
        <Box width={200} height={200} backgroundColor="light" />
        <Typography variant="h3" mt={20}>
          You don't have a name yet, poor you!
        </Typography>
        <p>You don't have a headline yet, poor you!</p>
      </Box>)
  }
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={40}>
      <Box width={200} height={200} backgroundColor="light" />
      <Typography variant="h3" mt={20}>
        {baseData.firstName} {baseData.lastName}
      </Typography>
      <p>{baseData.headline}</p>
    </Box>)
}
