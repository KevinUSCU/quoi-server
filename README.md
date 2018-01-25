# Quoi API Server
> JavaScript/Express-based backend API server for Quoi, my Galvanize Capstone project.


## Database Structure

![](./db/quoi-erd.png)

## Installation
1. npm install
2. cp .env.sample .env
3. cp db/server-state.json.sample db/server-state.json
### Development
4. createdb quoi_dev
5. npm run knex migrate:latest
6. npm run knex seed:run
7. npm run dev
### Testing
(db is created and removed automatically by test)
4. npm test

### Tokens
When a token is required for a route, it follows the following format:
* Requires a header with 'Authorization' key with a string value that is 'Bearer ' followed by the token value
* Example: { Authorization: 'Bearer eyJhbGciOiJIUz.I1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO' }  
  (please note this is not an actual token)

### Routes Use
#### AUTHENTICATION
Signup
Requires: a body with { email, password, firstname, lastname }
Returns: the user's token in a key/value object { Auth: token }

Login
Requires: a body with { email, password }
Returns: that user's token in a key/value object { Auth: token }

Update
Requires: a valid token, body with either/both { email, password }
Returns: the user id on success


## Next Steps
[ ] ...