import { shallow } from 'enzyme'
import React from 'react'
import ConnectForm from '../../components/ConnectForm'

import * as operatorService from '../../services/operator'
jest.mock('../../services/operator.js')

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

  it('calls operator service on submit', async () => {
    const spy = jest.fn()
    const component = shallow(<ConnectForm onConsentRequest={spy} />)

    component.find('input[name="id"]').simulate('change', { target: { value: 'my-fantastic-data-id' } })
    component.find('form').simulate('submit', new Event('foo'))

    expect(operatorService.requestConsent)
      .toHaveBeenCalledWith({ id: 'my-fantastic-data-id' })
  })
})
