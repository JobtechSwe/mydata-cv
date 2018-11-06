import React, { useState, useContext } from 'react'
import Section from './Section'
import LanguageDraft from './LanguageDraft'
import { Box, Typography, Modal, Button } from '@smooth-ui/core-sc'
import { putUserData } from '../../services/operator'
import { UserContext } from '../UserContext'

export default ({ languagesInit }) => {
  const [editId, setEditId] = useState(undefined)
  const [modalOpen, setModal] = useState(false)
  const [languages, setLanguages] = useState(languagesInit)
  const { accountId } = useContext(UserContext)

  const onSave = async (entry) => {
    setModal(false)
    const data = languages.map(x => {
      if (x.id === entry.id) {
        return Object.assign({}, x, entry)
      }
      return x
    })

    await putUserData(accountId, 'language', data)
    setLanguages(data)
  }

  const openModal = (id) => {
    setEditId(id)
    setModal(true)
  }

  return (
    <Section title="Languages">
      {languages.map((lang) => (
        <Box mt={5} key={lang.id}>
          <Typography variant="h6">
            {lang.languageName}
            <Button onClick={() => openModal(lang.id)} variant="light" ml={2} size="sm">Edit</Button>
          </Typography>
          <p>{lang.proficiency}</p>
        </Box>
      ))}
      <Modal opened={modalOpen} onClose={() => setModal(false)}>
        <LanguageDraft languageEntry={languages.filter(x => editId === x.id)[0]} onClose={() => setModal(false)} onSave={onSave} />
      </Modal>
    </Section>
  )
}
