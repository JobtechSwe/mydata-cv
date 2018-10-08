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
    it('Shows connect form as default', () => {
      const page = shallow(<ConnectPage />)
      expect(page.find('ConnectForm').exists()).toEqual(true)
    })

    it('Shows connect form for mode connect', () => {
      const page = shallow(<ConnectPage />)
      page.setState({mode: 'connect'})
      expect(page.find('ConnectForm').exists()).toEqual(true)
    })

    it('Shows connect form for mode connecting', () => {
      const page = shallow(<ConnectPage />)
      page.setState({mode: 'connecting'})
      expect(page.find('Connecting').exists()).toEqual(true)
    })

    it('Shows connect form for mode done', () => {
      const page = shallow(<ConnectPage />)
      page.setState({mode: 'done'})
      expect(page.find('ConnectDone').exists()).toEqual(true)
    })

    it('Shows connect form for mode error', () => {
      const page = shallow(<ConnectPage />)
      page.setState({mode: 'error'})
      expect(page.find('ConnectError').exists()).toEqual(true)
    })
  })

  describe('#onConsentRequest', () => {
    it('Sets mode to connecting', () => {
      const page = shallow(<ConnectPage />)
      const instance = page.instance()

      instance.onConsentRequest('1234')
      expect(page.state().mode).toEqual('connecting')
    })

    it('Sets consentId', () => {
      const page = shallow(<ConnectPage />)
      const instance = page.instance()

      instance.onConsentRequest('1234')
      expect(page.state().consentId).toEqual('1234')
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
