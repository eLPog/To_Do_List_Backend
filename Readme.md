REST API for creating a to-do list. The application has the following functionalities:

Structure:
The structure of the application is divided into few main elements/folders:
1.App: Main App file and Config file, contains the functions needed to run the application.
2.Routes:Identification of all endpoints.
3.Models: All database operations.
4.Controllers: Endpoints handling logic.
5.Utils: Additional functions

User registration and login:

-authorization and authentication is done using the json web token

-the password is stored in the database as a hash

-authentication takes place in the middleware (isAuth) function where the token is taken from the header

-the token is verified using the verify method (npm package jwt), in addition, it is checked if the token is in the token's table, stored in the database

-Upon successful login, the token is added to the database, and on successful logout, it is removed from it. This enables the token to be deactivated on request.

-if the user has forgotten the password, a new random password will be created and sent to the provided email

Tasks:

The logged user can take the following actions on the note:

-adding a new one

-get one

-get all

-edit

-delete one

-delete all 

-send all the tasks on email

Logs and errors data save:

The application saves all user logins/logoffs and errors to a file. The file path is set in environment variables. 

Database:

The application is built on a relational database. All data needed to properly connect to the database should be implemented as environment variables
