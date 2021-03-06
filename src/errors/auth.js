const Errors = {
    AUR_01: 'Token is invalid',
    AUR_02: 'Email is not verified',
    AUR_03: 'Invalid login details',
    AUR_04: 'Access denied',
    AUR_05: 'Token has expired. Please login to get a new token'
};

handleAuthErrors = (code, status, field) => {
    return {
      status,
      field,
      code: code,
      message: Errors[code],
    };
  };
  
  module.exports = handleAuthErrors;