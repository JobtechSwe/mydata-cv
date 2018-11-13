import React, { useContext } from 'react'
import { Box } from '@smooth-ui/core-sc'
import Header from '../components/Header'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import Languages from '../components/sections/Languages'
import { StoreContext } from '../services/StoreContext'

export default () => {
  const [data] = useContext(StoreContext)

  if (!data) {
    return <Box ml="auto" mr="auto" maxWidth={960}>Fetching data</Box>
  }

  return (
    <Box ml="auto" mr="auto" maxWidth={960}>
      <Header />
      <Box>
        <Experience />
        <Education />
        <Languages />
      </Box>
    </Box>
  )
}
