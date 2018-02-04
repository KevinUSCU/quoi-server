# Quoi API Server
> JavaScript/Express-based backend API server for Quoi, my Galvanize Capstone project.


## Database Structure

![](./db/quoi-erd.png)

## Installation
1. npm install
2. cp .env.sample .env
### Development
1. createdb quoi_dev
2. npm run knex migrate:latest
3. npm run knex seed:run
4. npm run dev
### Testing
(db is created and removed automatically by tests)
  
1. npm test

## Notes on Authentication
### Tokens
When a token is required for a route, it follows the following format:
* Requires a header with 'authorization' key with a string value that is 'Bearer ' followed by the token value
* Example: { authorization: 'Bearer eyJhbGciOiJIUz.I1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO' }  
  (please note this is not an actual token)
### Logins
#### Signup
Requires: a body with { email, password, firstname, lastname }  
Returns: the user's token in a key/value object { Auth: token }

#### Login  
Requires: a body with { email, password }  
Returns: that user's token in a key/value object { Auth: token }

#### Update  
Requires: a valid token from the user, body with either/both { email, password }  
Returns: the user id on success

### Route Protection:
* isUser: verifies that provided token belongs to an existing user or admin in the database
* isAdmin: verifies that provided token belongs to an existing admin in the database
* matchesThisUser: verifies that the provided token matches an existing user/admin in the database, and that their id matches the userId in the requested route
* matchesThisUserOrAdmin: verifies that the provided token matches an existing user/admin in the database, and that their id matches the userId in the requested route *OR* that the token belongs to an admin without requiring an id match
