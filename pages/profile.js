import React from 'react'
import { Box, Typography } from '@smooth-ui/core-sc'

const data = {
  baseData: {
    firstName: 'Anna',
    lastName: 'Andersson'
  },
  careerData: {
    headline: 'UX at SuperCompany',
    experience: [
      {
        employer: 'SuperCompany',
        title: 'UX',
        fromDate: '2014',
        toDate: '2018',
        description: `At SuperCompany I'm doing user research, prototyping, wireframes etc. Working in a cross-functional team.`
      },
      {
        employer: 'MyStartup',
        title: 'Co-founder & CMO',
        fromDate: '2010',
        toDate: '2013',
        description: `Business modelling, raising capital, prototyping, marketing, project leader, B2B-sales, PR activities, public speaking, product/market development, user testing, etc.`
      }
    ],
    education: [
      {
        schoolName: 'Uppsala University',
        fieldOfStudy: 'Engineering',
        degree: 'Master'
      },
      {
        schoolName: 'Hyper Island',
        fieldOfStudy: 'UX'
      }
    ],
    languages: [
      {
        languageName: 'Swedish',
        proficiency: 'Pretty good'
      },
      {
        languageName: 'English',
        proficiency: 'Not bad'
      }
    ]
  }
}

export default class ProfilePage extends React.Component {
  render () {
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
          {data.baseData.firstName} {data.baseData.lastName}
        </Typography>
        <p>{data.careerData.headline}</p>
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
          {data.careerData.experience.map((exp, i) => (
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
          {data.careerData.education.map((edu, i) => (
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
          {data.careerData.languages.map((lang, i) => (
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
