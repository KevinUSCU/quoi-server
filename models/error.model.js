function processErrorMessage(err) {
  /* This selectively prints errors to the server and client. In the default case, where the error comes from a function such as knex where sending details to the client may be a security concern, we send a generic message to the client while printing the details on the server. This process also helps prevent the continued execution of chained promises after an error is thrown. */
  if (err.message) {
    switch (err.message) {
      // case 'cannotDeleteAdmin': return { status: 403, message: 'Administrator accounts cannot be deleted' }
      case 'duplicateUser': return { status: 409, message: 'A user with this email address already exists' }
      // case 'incorrectRoleType': return { status: 400, message: "Role attribute must be either 'admin' or 'user'" }
      case 'invalidPassword': return { status: 401, message: 'Incorrect password' }
      case 'invalidToken': return { status: 401, message: 'A valid authorization token is required' }
      case 'missingEmail': return { status: 400, message: 'An email address is required' }
      case 'missingFirstname': return { status: 400, message: 'First name is required' }
      case 'missingLastname': return { status: 400, message: 'Last name is required' }
      case 'missingPassword': return { status: 400, message: 'A password is required' }
      case 'missingTip': return { status: 400, message: 'A tip is required' }
      // case 'missingRole': return { status: 400, message: 'Role attribute is required'}
      // case 'noSuchItem': return { status: 404, message: 'This item does not exist' }
      // case 'noSuchRoute': return { status: 404, message: 'This is not a valid route' }
      case 'noSuchTip': return { status: 404, message: 'This tip does not exist' }
      case 'noSuchUser': return { status: 404, message: 'This user does not exist' }
      // case 'requestorInvalid': return { status: 401, message: 'Requestor is not a valid user' }
      // case 'unauthorizedUser': return { status: 401, message: 'User is not authorized to access this resource' }
      default:
        console.log(err)
        return { status: 500, message: 'Our apologies, but an internal server error has occurred' }
    }
  }
}

module.exports = processErrorMessage
