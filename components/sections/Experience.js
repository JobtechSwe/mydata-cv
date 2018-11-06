import React, { useState, useContext } from 'react'
import Section from './Section'
import ExperienceDraft from './ExperienceDraft'
import { Box, Typography, Modal, Button } from '@smooth-ui/core-sc'
import { putUserData } from '../../services/operator'
import { UserContext } from '../UserContext'

export default ({ experienceInit }) => {
  const [editId, setEditId] = useState(undefined)
  const [modalOpen, setModal] = useState(false)
  const [experience, setExperience] = useState(experienceInit)
  const { accountId } = useContext(UserContext)

  const onSave = async (entry) => {
    setModal(false)
    const data = experience.map(x => {
      if (x.id === entry.id) {
        return Object.assign({}, x, entry)
      }
      return x
    })

    await putUserData(accountId, 'experience', data)
    setExperience(data)
  }

  const openModal = (id) => {
    setEditId(id)
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
        <ExperienceDraft experienceEntry={experience.filter(x => editId === x.id)[0]} onClose={() => setModal(false)} onSave={onSave} />
      </Modal>
    </Section>
  )
}
