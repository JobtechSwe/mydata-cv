import { shallow, mount } from 'enzyme'
import React from 'react'
import ConnectForm from '../../components/ConnectForm'
import * as operatorService from '../../services/operator'
jest.mock('../../services/operator')

describe('components/ConnectForm', () => {
  it('renders', () => {
    const component = mount(<ConnectForm />)
    expect(component.find('form').exists()).toEqual(true)
  })

  it('updates state on change', () => {
    const component = mount(<ConnectForm />)

    component.find('input#account-id').simulate('change', { target: { value: 'my-fantastic-data-id' } })

    expect(component.state().value).toEqual('my-fantastic-data-id')
  })

  it('does not submit if id is empty', () => {
    const component = mount(<ConnectForm />)

    component.find('form').simulate('submit', new Event('foo'))
    expect(component.find('.sui-control-feedback').text()).toEqual('Id cannot be empty')
  })

  it('clears error on change', () => {
    const component = mount(<ConnectForm />)
    const instance = component.instance()

    instance.handleSubmit(new Event('foo'))
    component.find('input#account-id').simulate('change', { target: { value: 'my-fantastic-data-id' } })

    expect(component.find('div.sui-control-feedback').text()).toBe('')
  })

  it('calls operator service with accountId on submit', () => {
    const component = mount(<ConnectForm onConsentRequest={''} />)
    const instance = component.instance()

    component.find('input#account-id').simulate('change', { target: { value: 'my-fantastic-data-id' } })
    instance.handleSubmit(new Event('foo'))

    expect(operatorService.requestConsent)
      .toHaveBeenCalledWith('my-fantastic-data-id')
  })

  it('calls onConsentRequest if operator service resolves', async () => {
    operatorService.requestConsent.mockResolvedValue({
      data: { id: 'abc-consent-id-123' },
      links: { self: 'blabalba' }
    })
    const spy = jest.fn()
    const instance = shallow(<ConnectForm onConsentRequest={spy} />)
      .setState({ value: 'my-account-id' })
      .instance()

    await instance.handleSubmit(new Event('foo'))

    expect(spy).toHaveBeenCalledWith({
      data: { id: 'abc-consent-id-123' },
      links: { self: 'blabalba' }
    })
  })

  it('does not call onConsentRequest if operator service rejects', async () => {
    operatorService.requestConsent.mockRejectedValue('')
    const spy = jest.fn()
    const instance = shallow(<ConnectForm onConsentRequest={spy} />)
      .setState({ value: 'my-account-id' })
      .instance()

    await instance.handleSubmit(new Event('foo'))

    expect(spy).toBeCalledTimes(0)
  })

  it('sets error state if operator service rejects', async () => {
    operatorService.requestConsent.mockRejectedValue('')
    const spy = jest.fn()
    const instance = shallow(<ConnectForm onConsentRequest={spy} />)
      .setState({ value: 'my-account-id' })
      .instance()

    await instance.handleSubmit(new Event('foo'))

    expect(instance.state.error).toEqual('Could not request consent for this account id')
  })
})
