import React, { useState, useContext } from 'react'
import Section from './Section'
import ExperienceDraft from './ExperienceDraft'
import { Box, Typography, Modal, Button } from '@smooth-ui/core-sc'
import { StoreContext } from '../../services/StoreContext'

export default () => {
  const [{ data: { experience } }, { updateExperienceEntry }] = useContext(StoreContext)

  // Local state
  const [draftId, setDraftId] = useState(undefined)
  const [modalOpen, setModal] = useState(false)

  const onSave = async (entry) => {
    await updateExperienceEntry(entry)
    setModal(false)
  }

  const openModal = (id) => {
    setDraftId(id)
    setModal(true)
  }

  return (
    <Section title="Experience">
      {experience.map((exp) => (
        <Box mt={5} key={exp.id}>
          <Typography variant="h6">
            {exp.title}
            <Button onClick={() => openModal(exp.id)} variant="light" ml={2} size="sm">Edit</Button>
          </Typography>
          <p>{exp.employer}, {exp.fromDate}-{exp.toDate}</p>
          <p>{exp.description}</p>
        </Box>
      ))}
      <Modal opened={modalOpen} onClose={() => setModal(false)}>
        <ExperienceDraft experienceEntry={experience.filter(x => draftId === x.id)[0]} onClose={() => setModal(false)} onSave={onSave} />
      </Modal>
    </Section>
  )
}
