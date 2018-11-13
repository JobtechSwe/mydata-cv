import React, { useContext } from 'react'
import { Box, theme } from '@smooth-ui/core-sc'
import Header from '../components/Header'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import Languages from '../components/sections/Languages'
import { StoreContext } from '../services/StoreContext'
import { RingLoader } from 'react-spinners'

export default () => {
  const [,,, loaded] = useContext(StoreContext)

  if (!loaded) {
    console.log(theme.black)
    return (
      <Box ml="auto" mr="auto" maxWidth={960} height="100vh" display="flex" justifyContent="center" alignItems="center">
        <RingLoader
          sizeUnit={'px'}
          size={60}
          color={theme.brick}
          loading
        />
      </Box>)
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
