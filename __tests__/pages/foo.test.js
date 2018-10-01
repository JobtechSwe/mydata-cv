/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import App from '../../pages/foo.js'

describe('With Enzyme', () => {
  it('App shows "Foo!"', () => {
    const app = shallow(<App />)

    expect(app.find('p').text()).toEqual('Foo')
  })
})