import React, { useState, useContext } from 'react'
import Section from './Section'
import LanguageDraft from './LanguageDraft'
import { Box, Typography, Modal, Button } from '@smooth-ui/core-sc'
import { StoreContext } from '../../services/StoreContext'

export default () => {
  const [{ data: { languages } }, { updateLanguageEntry }] = useContext(StoreContext)

  // Local state
  const [draftId, setDraftId] = useState(undefined)
  const [modalOpen, setModal] = useState(false)

  const onSave = async (entry) => {
    await updateLanguageEntry(entry)
    setModal(false)
  }

  const openModal = (id) => {
    setDraftId(id)
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
        <LanguageDraft languageEntry={languages.filter(x => draftId === x.id)[0]} onClose={() => setModal(false)} onSave={onSave} />
      </Modal>
    </Section>
  )
}
