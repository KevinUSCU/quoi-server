# Quoi API Server
> JavaScript/Express-based backend API server for Quoi, my Galvanize Capstone project.


## Database Structure

![](./db/quoi-erd.png)

## Installation
1. npm install
### Development
2. createdb quoi_dev
3. npm run knex migrate:latest
4. npm run knex seed:run
5. npm run dev
### Testing
2. createdb quoi_test
3. npm test

### Tokens
When a token is required for a route, it follows the following format:
* Requires a header with 'Authorization' key with a string value that is 'Bearer ' followed by the token value
* Example: { Authorization: 'Bearer eyJhbGciOiJIUz.I1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO' }  
  (please note this is not an actual token)

## Next Steps
[ ] ...