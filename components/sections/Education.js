import React, { useState, useContext } from 'react'
import Section from './Section'
import EducationDraft from './EducationDraft'
import { Box, Typography, Modal, Button } from '@smooth-ui/core-sc'
import { StoreContext } from '../../services/StoreContext'

export default () => {
  const [{ data: { education } }, { updateEducationEntry }] = useContext(StoreContext)

  // Local state
  const [draftId, setDraftId] = useState(undefined)
  const [modalOpen, setModal] = useState(false)

  const onSave = async (entry) => {
    await updateEducationEntry(entry)
    setModal(false)
  }

  const openModal = (id) => {
    setDraftId(id)
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
        <EducationDraft educationEntry={education.filter(x => draftId === x.id)[0]} onClose={() => setModal(false)} onSave={onSave} />
      </Modal>
    </Section>
  )
}
