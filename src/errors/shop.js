const Errors = {
    SAR_01: 'Shop name is required',
    SAR_02: 'Shop description is required',
    SAR_03: 'Shop location is required',
    SAR_04: 'Shop already exist',
    SAR_05: 'Shop id is required',
    SAR_06: 'No shop found'
}

handleShopErrors = (code, status, field) => {
    return {
      status,
      field,
      code: code,
      message: Errors[code],
    };
  };
  
  module.exports = handleShopErrors;