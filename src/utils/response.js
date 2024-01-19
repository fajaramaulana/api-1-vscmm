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
      limit = 10,
      offset = 0,
      search = []) => ({
    success: true,
    meta: {
      totalCount,
      limit,
      offset,
      search,
    },
    type: 'pagination',
    data: items,
    message: 'Request succeeded',
  }),

  nonPagination: (data = [], message = 'Request succeeded') => ({
    success: true,
    type: 'nonPagination',
    data,
    message,
  }),
};

module.exports = response;

