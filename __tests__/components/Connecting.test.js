import { shallow, mount } from 'enzyme'
import React from 'react'
import Connecting from '../../components/Connecting'
import * as operatorService from '../../services/operator'
jest.mock('../../services/operator.js')

describe('components/Connecting', () => {
  it('renders connecting message', () => {
    const component = shallow(<Connecting/>)
    expect(component.find('.connectingMessage').exists()).toEqual(true)
  })

  it('calls operator service', () => {
    const component = mount(<Connecting/>)
    expect(operatorService.getConsent).toBeCalled()
  })

  it('calls operator service', () => {
    const component = mount(<Connecting/>)
    expect(operatorService.getConsent).toBeCalled()
  })
})
