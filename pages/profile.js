import React from 'react'
import { Box } from '@smooth-ui/core-sc'
import { getUserData } from '../services/operator'
import Section from '../components/Section'
import ItemTitle from '../components/ItemTitle'
import Header from '../components/Header'

export default class ProfilePage extends React.Component {
  state = {}

  async componentDidMount () {
    const data = await getUserData('anna123')
    this.setState({ data })
  }

  render () {
    if (!this.state.data) {
      return <Box ml="auto" mr="auto" maxWidth={960}>Fetching data</Box>
    }

    return (
      <Box ml="auto" mr="auto" maxWidth={960}>
        <Header
          firstName={this.state.data.baseData.firstName}
          lastName={this.state.data.baseData.lastName}
          headline={this.state.data.careerData.headline}
        />
        <Box>
          <Section title="Experience">
            {this.state.data.careerData.experience.map((exp, i) => (
              <Box mt={5} key={i}>
                <ItemTitle title={exp.title} />
                <p>{exp.employer}, {exp.fromDate}-{exp.toDate}</p>
                <p>{exp.description}</p>
              </Box>
            ))}
          </Section>
          <Section title="Education">
            {this.state.data.careerData.education.map((edu, i) => (
              <Box mt={5} key={i}>
                <ItemTitle title={edu.schoolName} />
                <p>{edu.fieldOfStudy}</p>
              </Box>
            ))}
          </Section>
          <Section title="Languages">
            {this.state.data.careerData.languages.map((lang, i) => (
              <Box mt={5} key={i}>
                <ItemTitle title={lang.languageName} />
                <p>{lang.proficiency}</p>
              </Box>
            ))}
          </Section>
        </Box>
      </Box>)
  }
}
