import React from 'react'
import './Header.styl'
import { IndexLink } from 'react-router'
import Navigation from './Navigation'

export default (props) => {
  return (
    <header>
      <strong>
        <IndexLink to='/'> Quick Books React Redux Application </IndexLink>
      </strong>
      <Navigation />
    </header>
  )
}
