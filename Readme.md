# REST API for creating a to-do list. The application has the following functionalities: #
 ## The structure of the application is divided into few main elements/folders: ##
  * App: Main App file and Config file, contains the functions needed to run the application
  * Routes:Identification of all endpoints
  * Models: All database operations
  * Controllers: Endpoints handling logic
  * Utils: Additional functions
  * Dependency injection using awilix package
  * The tests folder contains tests written in JEST covering all the functionality of the application

## User registration and login: ##

* authorization and authentication is done using the json web token

* the password is stored in the database as a hash

* authentication takes place in the middleware (isAuth) function where the token is taken from the header

* the token is verified using the verify method (npm package jwt), in addition, it is checked if the token is in the token's table, stored in the database

 * Upon successful login, the token is added to the database, and on successful logout, it is removed from it. This enables the token to be deactivated on request.

* if the user has forgotten the password, a new random password will be created and sent to the provided email

## The logged user can take the following actions on the note: ##

* adding a new one

* get one

* get all

* edit

* delete one

* delete all 

* send all the tasks on email

## Database: ##

* The application is built on a relational database. All data needed to properly connect to the database should be implemented as environment variables
