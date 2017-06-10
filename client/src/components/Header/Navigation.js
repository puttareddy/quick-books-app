import React from 'react'
import { Link } from 'react-router'
import './Navigation.styl'

export default (props) => {
  
  return (
    <nav role='navigation'>
      <ul>
        <li>
          <Link to='/sync/authorize' onClick={startMigration}>Migrate Data</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )

  function startMigration() {
    window.location = '/sync/authorize';
  }
}
