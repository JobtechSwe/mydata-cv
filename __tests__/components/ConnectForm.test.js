/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import ConnectForm from '../../components/ConnectForm'

describe('components/ConnectForm', () => {
  it('renders', () => {
    const component = shallow(<ConnectForm />)
    expect(component.find('form').exists()).toEqual(true)
  })
})
