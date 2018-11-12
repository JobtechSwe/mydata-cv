import React, { useContext } from 'react'
import { Box, Typography } from '@smooth-ui/core-sc'
import { StoreContext } from '../services/StoreContext'

export default () => {
  const [{ data: { baseData: { firstName, lastName, headline } } }] = useContext(StoreContext)
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={40}>
      <Box width={200} height={200} backgroundColor="light" />
      <Typography variant="h3" mt={20}>
        {firstName} {lastName}
      </Typography>
      <p>{headline}</p>
    </Box>)
}
