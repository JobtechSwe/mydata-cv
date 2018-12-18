const consents = new Map()

module.exports = {
  saveConsent: consent => consents.set(consent.id, consent),
  getConsent: id => consents.get(id)
}
