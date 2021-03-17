const Errors = {
    USR_01: 'Email or Password is invalid.',
    USR_02: 'Password is required.',
    USR_03: 'The email is invalid.',
    USR_04: 'The email already exists.',
    USR_05: "The email doesn't exist.",
    USR_06: 'Password is too short',
    USR_07: 'Username is required'
};


handleUserErrors = (code, status, field) => {
  return {
    status,
    field,
    code: code,
    message: Errors[code],
  };
};

module.exports = handleUserErrors;