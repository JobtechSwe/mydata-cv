const consents = new Map()

module.exports = {
  set: consent => consents.set(consent.id, consent),
  get: id => consents.get(id)
}
