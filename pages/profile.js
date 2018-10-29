import React from 'react'
import { Box, Typography } from '@smooth-ui/core-sc'
import { getUserData } from '../services/user'

export default class ProfilePage extends React.Component {
  state = {}

  async componentDidMount () {
    const data = await getUserData('anna123')
    this.setState({ data })
  }

  render () {
    if (!this.state.data) {
      return <Box
        ml="auto"
        mr="auto"
        maxWidth={960}
      >
        Fetching data
      </Box>
    }
    return <Box
      ml="auto"
      mr="auto"
      maxWidth={960}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={40}
      >
        <Box width={200} height={200} backgroundColor="secondary">
        </Box>
        <Typography variant="h3" mt={20}>
          {this.state.data.baseData.firstName} {this.state.data.baseData.lastName}
        </Typography>
        <p>{this.state.data.careerData.headline}</p>
      </Box>
      <Box>
        <Box
          borderTop={1}
          borderColor="primary"
          p={3}
        >
          <Typography variant="h5" color="secondary">
            Experience
          </Typography>
          {this.state.data.careerData.experience.map((exp, i) => (
            <Box mt={5} key={i}>
              <Typography variant="h6">
                {exp.title}
              </Typography>
              <p>{exp.employer}, {exp.fromDate}-{exp.toDate}</p>
              <p>{exp.description}</p>
            </Box>
          ))}
        </Box>
        <Box
          borderTop={1}
          borderColor="primary"
          p={3}
        >
          <Typography variant="h5" color="secondary">
            Education
          </Typography>
          {this.state.data.careerData.education.map((edu, i) => (
            <Box mt={5} key={i}>
              <Typography variant="h6">
                {edu.schoolName}
              </Typography>
              <p>{edu.fieldOfStudy}</p>
            </Box>
          ))}
        </Box>
        <Box
          borderTop={1}
          borderColor="primary"
          p={3}
        >
          <Typography variant="h5" color="secondary">
            Languages
          </Typography>
          {this.state.data.careerData.languages.map((lang, i) => (
            <Box mt={5} key={i}>
              <Typography variant="h6">
                {lang.languageName}
              </Typography>
              <p>{lang.proficiency}</p>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  }
}
