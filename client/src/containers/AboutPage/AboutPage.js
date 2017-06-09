import './AboutPage.styl'
import React from 'react'

const AboutPage = () => {
  return (
    <div className='about'>
      <h1> About </h1>
      This is a FULL Stack application with below technologies <br />
      <ol>
        <li> Loopback JS is used to serve RESTFul APIs</li>
        <li> React/Redux is used to FE application  </li>
        <li> MongoDB as a database (SasS)</li>
        <li> QuickBooks API as datasource </li>
        <li> Docker and Docker compose to deploy the application </li>
      </ol>
     <p>
        The learning never stops so any feedback, comments,
        criticisms are greatly welcomed!
      </p>
      <p> Source code at: &nbsp;
        <a href='https://github.com/puttareddy/quick-books-app'>
          <img className='github-logo' title='Github logo face'
            src='http://cdn.flaticon.com/svg/37/37819.svg' />
            /puttareddy/quick-books-app
        </a>
      </p>
    </div>
  )
}

export default AboutPage
