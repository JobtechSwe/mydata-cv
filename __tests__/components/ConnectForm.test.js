/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import ConnectForm from '../../components/ConnectForm'
import axios from 'axios'
jest.mock('axios')

describe('components/ConnectForm', () => {
  it('renders', () => {
    const component = shallow(<ConnectForm />)
    expect(component.find('form').exists()).toEqual(true)
  })

  it('updates state on change', () => {
    const component = shallow(<ConnectForm />)

    component.find('input[name="id"]').simulate('change', { target: { value: 'my-fantastic-data-id' } })

    expect(component.state().value).toEqual('my-fantastic-data-id')
  })

  it('does not submit if id is empty', () => {
    const component = shallow(<ConnectForm />)

    component.find('form').simulate('submit', new Event('foo'))
    expect(component.find('.error').text()).toEqual('Id cannot be empty')
  })

  it('clears error on change', () => {
    const component = shallow(<ConnectForm />)

    component.find('form').simulate('submit', new Event('foo'))
    component.find('input[name="id"]').simulate('change', { target: { value: 'my-fantastic-data-id' } })

    expect(component.find('.error').text()).toEqual('')
  })

  it('posts to operator on submit', () => {
    const component = shallow(<ConnectForm />)

    component.find('input[name="id"]').simulate('change', { target: { value: 'my-fantastic-data-id' } })
    component.find('form').simulate('submit', new Event('foo'))

    expect(axios.post).toBeCalled()
  })
})
