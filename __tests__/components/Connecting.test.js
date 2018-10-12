import { shallow } from 'enzyme'
import React from 'react'
import Connecting from '../../components/Connecting'
import * as operatorService from '../../services/operator'
jest.mock('../../services/operator')

describe('components/Connecting', () => {
  it('renders connecting message', () => {
    const component = shallow(<Connecting onConsentApproved={jest.fn()}/>)
    expect(component.find('.connectingMessage').exists()).toEqual(true)
  })

  it('calls operator service', () => {
    const component = shallow(<Connecting onConsentApproved={jest.fn()}/>)
    expect(operatorService.getConsent).toHaveBeenCalled()
  })

  it('calls operator service with consentId', () => {
    const component = shallow(<Connecting consentId="1234" onConsentApproved={jest.fn()}/>)
    expect(operatorService.getConsent).toBeCalledWith('1234')
  })

  it('calls onConsentApproved if operatorService resolves', async () => {
    const spy = jest.fn()
    operatorService.getConsent.mockResolvedValue({ id: 'blablab'})
    const component = shallow(<Connecting consentId="1234" onConsentApproved={spy}/>)
    const instance = component.instance()

    await instance.getConsents()

    expect(spy).toHaveBeenCalledWith({ id: 'blablab' })
  })

  it('calls onConsentRejected if operatorService rejects', async () => {
    const spy = jest.fn()
    operatorService.getConsent.mockRejectedValue({ error_message: 'blablab'})
    const component = shallow(<Connecting consentId="1234" onConsentRejected={spy}/>)
    const instance = component.instance()

    await instance.getConsents()

    expect(spy).toHaveBeenCalledWith({ error_message: 'blablab'})
  })
})
