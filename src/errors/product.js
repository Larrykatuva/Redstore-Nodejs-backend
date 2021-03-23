const Errors = {
    PAR_01: 'No products available',
    PAR_02: 'Product is not found',
    PAR_03: 'Product already exist',
    PAR_04: 'Product id is required',
    PAR_05: 'Product name is required'
}

handleProductErrors = (code, status, field) => {
    return {
      status,
      field,
      code: code,
      message: Errors[code],
    };
  };
  
  module.exports = handleProductErrors;