# Lab 16 - Basic Auth
**Author**: Ovi Parasca, Jennifer Bach
**Version**: 1.0.0

## Links
  * GitHub Master - https://github.com/jbach197/16-basic-authentication.git
  * Pull Request - https://github.com/codefellows-seattle-javascript-401d24/16-basic-authentication/pull/1
  * Travis - https://travis-ci.com/jbach197/16-basic-authentication/builds/75810601
  * Heroku - https://lab16-ovijen.herokuapp.com

## Project Overview and Requirements
Create a server, with middleware, that requires usernames and passwords (basic authentication) to log into the website.  Users also have the ability to create a new account.

In compliance with the principles of basic auth, passwords will be hashed before storing into the database.

Requirements include:
* Create an HTTP server with express
* Use mongoose to create a user model including: username, email, password
* Custom routes for Sign Up and Sign In

## Instillation Instructions
* Fork and clone the repository
* Run npm install
* Toucn an .env file and add: PORT=3000, MONGODB_URI=mongodb://localhost:27017/

## Verification via Postman
* View current users (/api/v1/users)
  * Visit the above link in Heroku, witht he above extension or insert into Postman and select the 'Get' option
  * A hashed password will be visible
* Sign Up route (/api/v1/signup)
  * Enter Post and the URL with the above extention
    - Select 'basic auth' from the type down
    - Create a username, password and email
* Sign In Route (/api/v1/signup)
  * In postman, enter the GET request

## Expected Error Messages
* the server should respond with **200** for successful GET and POST requests
* the server should respond with **400 Bad Request** to a failed request for GET and POST requests
* the server should respond with **401 Unauthroizedt** for non-authenticated users

## Credits
Assistance from the TAs, instructor and various class members.  Generally consulted google but did not pull anything from specific sources.