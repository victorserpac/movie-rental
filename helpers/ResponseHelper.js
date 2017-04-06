export class ResponseHelper {

  // Respond to routes
  static respondWithResult( res, statusCode ) {
    statusCode = statusCode || 200;
    return function( entity ) {
      if ( entity ) {
        return res.status( statusCode ).json( entity );
      }
      return null;
    };
  }

  // Handle Errors in catch promises
  static handleError( res, statusCode ) {
    statusCode = statusCode || 500;
    return function( err ) {
      res.status( statusCode ).send( err );
    };
  }
}
