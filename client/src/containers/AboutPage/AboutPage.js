import './AboutPage.styl'
import React from 'react'

const AboutPage = () => {
  return (
    <div className='about'>
      <h1> About App</h1>
      Quick Book App is FULL Stack application with below features <br />
      <ol>
        <li> Expose RESTFul APIs with Loopback.JS </li>
        <li> Build Client application with React/Redux </li>
        <li> Use MongoDB as a SaaS</li>
        <li> Use QuickBooks API as datasource </li>
        <li> Migrate data from QuickBooks API to MongoDB </li>
        <li> Docker and Docker compose to deploy the applications </li>
      </ol>

      <h4> Quick Notes </h4>
     <p>
        To migrate data from QB API to MongoDB, you should be authorized to 
        perform this operation. Credentials will be shared on demand to validate this feature.
        <br/> <br/>
        Also, Migration would not trigger, if it is already happened in the same session. 
        As of now, session expiration time is set as 25 seconds.
      </p>
     <h4> Share your own! </h4>
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
      <br/>
    </div>
  )
}

export default AboutPage
