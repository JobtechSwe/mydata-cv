
const createRequestWithExpiry = (now, durationInSeconds) => ({
  scope: [
    {
      domain: 'localhost:4000',
      area: 'cv',
      description: 'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      permissions: [ 'write' ],
      purpose: 'In order to create a CV using our website.',
      lawfulBasis: 'CONSENT',
      required: true
    }
  ],
  expiry: now() / 1000 + durationInSeconds
})

const createRequest = createRequestWithExpiry(Date.now, 3600 * 6)

module.exports = {
  createRequest,
  createRequestWithExpiry // Exposed for testing purposes
}

// Kept here for future reference

/* Lawful bases:
'CONSENT',
'CONTRACT',
'LEGAL_OBLIGATION',
'VITAL_INTERESTS',
'PUBLIC_TASK',
'LEGITIMATE_INTERESTS'
*/

/* const additional = [{
  domain: 'cv.work',
  area: 'cv',
  description: 'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
  permissions: ['store'],
  purpose: 'In order to make you searchable to recruiters on our public website.',
  lawfulBasis: 'CONSENT'
},
{
  domain: 'cv.work',
  area: 'contact',
  description: 'Your personal information such as contact information, email, phone and names that you have entered in the service and that we\'ve gathered from Skatteverket.',
  permissions: [ 'write' ],
  purpose: 'In order for recruiter to be able to contact you',
  lawfulBasis: 'CONSENT'
},
{
  domain: 'cv.work',
  area: 'geography',
  description: 'The region where you live.',
  permissions: [ 'write', 'store' ],
  purpose: 'In order for regions to be used as a search criteria.',
  lawfulBasis: 'CONSENT',
},
{
  domain: 'skatteverket.se',
  area: 'name',
  permissions: [ 'read' ],
  purpose: 'To prefill your contact and geography information.',
  lawfulBasis: 'CONSENT'
},
{
  domain: 'ladok.se',
  area: 'examen',
  permissions: [ 'read' ],
  purpose: 'To prefill your educational experience.',
  lawfulBasis: 'CONSENT'
}]
 */
