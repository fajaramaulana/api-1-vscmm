// responseApi.js

const response = {
  success: (data = null, message = 'Request succeeded') => ({
    success: true,
    message,
    data,
  }),

  error: (message = 'Internal Server Error', code = 500, errors = []) => ({
    code,
    success: false,
    message,
    error: errors,
  }),

  detail: (data = null, message = 'Request succeeded') => ({
    success: true,
    type: 'detail',
    data,
    message,
  }),

  pagination: (
      items = [],
      totalCount = 0,
      take = 0,
      skip = 0,
      search = []) => ({
    success: true,
    code: 200,
    message: 'Request succeeded',
    meta: {
      totalCount,
      take,
      skip,
      search,
    },
    type: 'pagination',
    data: items,
    
  }),

  nonPagination: (data = [], message = 'Request succeeded') => ({
    success: true,
    type: 'nonPagination',
    data,
    message,
  }),
};

module.exports = response;

