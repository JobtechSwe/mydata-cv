import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    operatorUrl: 'aTotallyLegitOperatorUrl',
    redirectUri: 'returnherefromoperator'
  }
}))

configure({ adapter: new Adapter() })
