import React, { useState, useContext } from 'react'
import { UserContext } from '../UserContext'
import Section from './Section'
import EducationDraft from './EducationDraft'
import { Box, Typography, Modal, Button } from '@smooth-ui/core-sc'
import { putUserData } from '../../services/operator'

export default ({ educationInit }) => {
  const [editId, setEditId] = useState(undefined)
  const [modalOpen, setModal] = useState(false)
  const [education, setEducation] = useState(educationInit)
  const { accountId } = useContext(UserContext)

  const onSave = async (entry) => {
    setModal(false)
    const data = education.map(x => {
      if (x.id === entry.id) {
        return Object.assign({}, x, entry)
      }
      return x
    })

    await putUserData(accountId, 'education', data)
    setEducation(data)
  }

  const openModal = (id) => {
    setEditId(id)
    setModal(true)
  }

  return (
    <Section title="Education">
      {education.map((edu) => (
        <Box mt={5} key={edu.id}>
          <Typography variant="h6">
            {edu && edu.schoolName}
            <Button onClick={() => openModal(edu.id)} variant="light" ml={2} size="sm">Edit</Button>
          </Typography>
          <p>{edu && edu.fieldOfStudy}</p>
        </Box>
      ))}
      <Modal opened={modalOpen} onClose={() => setModal(false)}>
        <EducationDraft educationEntry={education.filter(x => editId === x.id)[0]} onClose={() => setModal(false)} onSave={onSave} />
      </Modal>
    </Section>
  )
}
