<h1> REST API for creating a to-do list. The application has the following functionalities: </h1>
 <h2> The structure of the application is divided into few main elements/folders: </h2>
 <ul>
 
  <li>App: Main App file and Config file, contains the functions needed to run the application</li>
  <li>Routes:Identification of all endpoints</li>
  <li>Models: All database operations</li>
  <li>Controllers: Endpoints handling logic</li>
  <li>Utils: Additional functions</li>
  <li>Dependency injection using awilix package</li>
  <li>The tests folder contains tests written in JEST covering all the functionality of the application</li>
</ul>
<h2> User registration and login: </h2>
<ul>
<li>authorization and authentication is done using the json web token</li>
<li>the password is stored in the database as a hash</li>
<li>authentication takes place in the middleware (isAuth) function where the token is taken from the header</li>
<li>the token is verified using the verify method (npm package jwt), in addition, it is checked if the token is in the token's table, stored in the database</li>
<li> Upon successful login, the token is added to the database, and on successful logout, it is removed from it. This enables the token to be deactivated on request.</li>
<li>if the user has forgotten the password, a new random password will be created and sent to the provided email</li>
</ul>

<h2>The logged user can take the following actions on the note:</h2>
<ul>
<li> adding a new one</li>
<li> get one</li>
<li> get all</li>
<li> edit</li>
<li> delete one</li>
<li> delete all </li>
<li> send all the tasks on email</li>
</ul>
<h2> Database: </h2>
<p>
The application is built on a relational database. All data needed to properly connect to the database should be implemented as environment variables
</p>
<hr>
<h1>Code examples</h1>
<p>Main app file structure and settings.</p>
<img src="https://user-images.githubusercontent.com/89840843/185794455-ea4f4513-9867-48e8-8521-6c2e110f0f8d.png"><hr>
<p>Own errors handling.</p>
<img src="https://user-images.githubusercontent.com/89840843/185794521-4a852a33-d43e-4937-84ee-5ef4d6de7563.png"><hr>
<p>Awilix setup file.</p>
<img src="https://user-images.githubusercontent.com/89840843/185794546-f4a321b9-d896-41ed-a657-e5f11c141849.png"><hr>
<p>Function to check jwt authorization.</p>
<img src="https://user-images.githubusercontent.com/89840843/185794580-e9d4982c-4ed6-4130-b8d2-bfbae95c42c2.png"><hr>
<p>Examples test code at create new user.</p>
<img src="https://user-images.githubusercontent.com/89840843/185794619-67b07192-6552-4bc9-b0c5-19dd16629c21.png"><hr>
<p>Examples test code on users database operations.</p>
<img src="https://user-images.githubusercontent.com/89840843/185794653-748c3674-efd6-48aa-97fc-233911bdf061.png"><hr>
