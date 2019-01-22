const consents = new Map()

module.exports = {
  saveConsent: consent => consents.set(consent.consentId, consent),
  getConsent: id => consents.get(id)
}
