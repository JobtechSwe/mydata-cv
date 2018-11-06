import React, { useState } from 'react'
import { FormGroup, Label, ModalDialog, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Typography, Input } from '@smooth-ui/core-sc'

export default ({ experienceEntry, onSave, onClose }) => {
  const [title, setTitle] = useState(experienceEntry.title)
  const [employer, setEmployer] = useState(experienceEntry.employer)
  const [description, setDescription] = useState(experienceEntry.description)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSave({ id: experienceEntry.id, title, employer, description })
    }
  }

  return (
    <ModalDialog>
      <ModalContent>
        <ModalHeader>
          <Typography variant="h5" m={0}>
            Edit education
          </Typography>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <Input control value={title} id="title" onChange={(e) => setTitle(e.target.value)} onKeyPress={handleKeyPress} />
            <Label>Employer</Label>
            <Input control value={employer} id="employer" onChange={(e) => setEmployer(e.target.value)} onKeyPress={handleKeyPress} />
            <Label>Description</Label>
            <Input control value={description} id="description" onChange={(e) => setDescription(e.target.value)} onKeyPress={handleKeyPress} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => onSave({ id: experienceEntry.id, title, employer, description })}>Save changes</Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalDialog>)
}
