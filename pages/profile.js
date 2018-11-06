import React from 'react'
import { Box } from '@smooth-ui/core-sc'
import { getUserData } from '../services/operator'
import Header from '../components/Header'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import Languages from '../components/sections/Languages'
import { Provider } from '../components/UserContext'
import { retriveId } from '../services/storage'
import Router from 'next/router'

export default class ProfilePage extends React.Component {
  state = {
    data: {}
  }

  async componentDidMount () {
    const accountId = retriveId()
    if (!accountId) {
      Router.push({
        pathname: '/connect'
      })
    } else {
      const data = await getUserData(accountId)
      this.setState({ data, accountId })
    }
  }

  render () {
    if (!this.state.data.baseData) {
      return <Box ml="auto" mr="auto" maxWidth={960}>Fetching data</Box>
    }

    return (
      <Provider accountId={this.state.accountId}>
        <Box ml="auto" mr="auto" maxWidth={960}>
          <Header
            firstName={this.state.data.baseData.firstName}
            lastName={this.state.data.baseData.lastName}
            headline={this.state.data.baseData.headline}
          />
          <Box>
            <Experience experienceInit={this.state.data.experience} />
            <Education educationInit={this.state.data.education} />
            <Languages languagesInit={this.state.data.languages} />
          </Box>
        </Box>
      </Provider>
    )
  }
}
