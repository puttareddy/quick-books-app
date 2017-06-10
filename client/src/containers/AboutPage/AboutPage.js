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
        To migrate data from QB API to MongoDB, you should be authorized to 
        perform this operation. Credentials will be shared on demand to validate this feature.
        <br/> <br/>
        Also, Migration would not trigger, if it is already happened in the same session. 
        As of now, session expiration time is set as 25 seconds.
      </p>
     
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
