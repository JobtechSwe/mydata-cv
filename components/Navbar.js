import React from 'react'
import { Typography, styled } from '@smooth-ui/core-sc'

const Navbar = styled.nav`
  height: 60px;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.15);
  background-color: white;
`

const Headline = styled(Typography)`
  color: #6c757d;
  text-align: center;
  line-height: 1.4em;
`

export default () => {
  return (
    <Navbar>
      <Headline variant="h1">C : V</Headline>
    </Navbar>)
}
