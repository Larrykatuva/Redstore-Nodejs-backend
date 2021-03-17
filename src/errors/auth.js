const Errors = {
    AUR_01: 'Token is invalid',
    AUR_02: 'Email is not verified'
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