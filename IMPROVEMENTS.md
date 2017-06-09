# Improvements roadmap at a glance 

Here are the list of improvements can be made to this application.  With the app development flow out-of-the-way,
I can focus on these improvements in near future.

###The learning never stops so any feedback, comments, criticisms are greatly welcomed!

Technical
=========================

 * API Server -- LoopbackJS can be used as Integration gateway between multiple eco-systems. In the current implementaiton,
 used to do CURD options on MongoDB data. Can be used as a proxy for QuickBooks API as well.
 * Assembly Server -- ExpressJS can be used to assemble between differnt layers like Front-End app, API server etc., 
 This also can be used for managment, Authentication and Authentication (may be using JWT) etc.,
 * Client application -- React/Redux used to develop Front-End application. The generated bundle can be injected to Assembly
 server alone for user interface.
    This can also be developed/tested indepedently in development mode without having dependencies on Server side

 Functional
=========================

 * We can create a form that edits a record in Quickbooks (not Mongo) and refreshes the Mongo database
