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
})

xdescribe('With Snapshot Testing', () => {
  it('renders', () => {
    const component = renderer.create(<ConnectPage />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
