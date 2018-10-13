/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import ConnectPage from '../../pages/connect.js'

describe('pages/ConnectPage', () => {
  it('renders', () => {
    const page = shallow(<ConnectPage />)

    expect(page.find('ConnectForm').exists()).toEqual(true)
  })

  it('renders "done"', () => {
    const page = shallow(<ConnectPage />)
    page.setState({
      mode: 'done'
    })

    expect(page.find('ConnectDone').exists()).toEqual(true)
  })

  describe('.mode', () => {
    it('Shows ConnectForm as default', () => {
      const page = shallow(<ConnectPage />)
      expect(page.find('ConnectForm').exists()).toEqual(true)
    })

    it('Shows ConnectForm for mode connect', () => {
      const page = shallow(<ConnectPage />)
      page.setState({ mode: 'connect' })
      expect(page.find('ConnectForm').exists()).toEqual(true)
    })

    it('Shows Connecting for mode connecting', () => {
      const page = shallow(<ConnectPage />)
      page.setState({ mode: 'connecting', consent: { id: '123'} })
      expect(page.find('Connecting').exists()).toEqual(true)
    })

    it('Shows ConnectDone for mode done', () => {
      const page = shallow(<ConnectPage />)
      page.setState({ mode: 'done' })
      expect(page.find('ConnectDone').exists()).toEqual(true)
    })

    it('Shows ConnectError for mode error', () => {
      const page = shallow(<ConnectPage />)
      page.setState({ mode: 'error' })
      expect(page.find('ConnectError').exists()).toEqual(true)
    })
  })

  describe('#onConsentRequest', () => {
    let consent

    beforeEach(() => {
      consent = {
        data: { id: '1234'},
        links: { self: '/consent/1234'}
      }
    })

    it('Sets mode to connecting', () => {
      const page = shallow(<ConnectPage />)
      const instance = page.instance()

      instance.onConsentRequest(consent)
      expect(page.state().mode).toEqual('connecting')
    })

    it('Sets consent', () => {
      const page = shallow(<ConnectPage />)
      const instance = page.instance()

      instance.onConsentRequest(consent)
      expect(page.state().consent).toEqual(consent)
    })
  })

  describe('#onConsentApproved', () => {
    it('Sets mode to done', () => {
      const page = shallow(<ConnectPage />)
      const instance = page.instance()

      instance.onConsentApproved({id: '1234'})
      expect(page.state().mode).toEqual('done')
    })
  })

  describe('#onConsentRejected', () => {
    it('Sets mode to error', () => {
      const page = shallow(<ConnectPage />)
      const instance = page.instance()

      instance.onConsentRejected({error: 'something went wrong'})
      expect(page.state().mode).toEqual('error')
    })
  })
})

// TODO: restore
xdescribe('With Snapshot Testing', () => {
  it('renders', () => {
    const component = renderer.create(<ConnectPage />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
