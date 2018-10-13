import { shallow } from 'enzyme'
import React from 'react'
import Connecting from '../../components/Connecting'
import * as operatorService from '../../services/operator'
jest.mock('../../services/operator')

describe('components/Connecting', () => {
  let consent

  beforeEach(() => {
    consent = {
      data: { id: '2344'},
      links: { self: '/consent/2344'}
    }
  })

  it('renders connecting message', () => {
    const component = shallow(<Connecting onConsentApproved={jest.fn()} consent={consent}/>)
    expect(component.find('.connectingMessage').exists()).toEqual(true)
  })

  it('calls operator service', () => {
    const component = shallow(<Connecting onConsentApproved={jest.fn()} consent={consent}/>)
    expect(operatorService.getConsent).toHaveBeenCalled()
  })

  it('calls operator service with consent', () => {
    const component = shallow(<Connecting onConsentApproved={jest.fn()} consent={consent}/>)
    expect(operatorService.getConsent).toBeCalledWith(consent)
  })

  it('calls onConsentApproved if operatorService resolves', async () => {
    const spy = jest.fn()
    operatorService.getConsent.mockResolvedValue({ id: 'blablab'})
    const component = shallow(<Connecting onConsentApproved={spy} consent={consent}/>)
    const instance = component.instance()

    await instance.getConsents()

    expect(spy).toHaveBeenCalledWith({ id: 'blablab' })
  })

  it('calls onConsentRejected if operatorService rejects', async () => {
    const spy = jest.fn()
    operatorService.getConsent.mockRejectedValue({ error_message: 'blablab'})
    const component = shallow(<Connecting onConsentRejected={spy} consent={consent}/>)
    const instance = component.instance()

    await instance.getConsents()

    expect(spy).toHaveBeenCalledWith({ error_message: 'blablab'})
  })
})
