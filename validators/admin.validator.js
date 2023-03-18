const yup = require('yup');
require('yup-password')(yup);

const { responseMessages } = require('../constants');
const { validator } = require('../helper/validator');

const addCourt = async (req, res, next) => {
  const schema = yup.object({
    body: yup.object({
      name: yup.string().typeError(responseMessages.COURT_NAME_MUST_BE_STRING).required(responseMessages.COURT_NAME_IS_REQUIRED),
      bookingType: yup.string().oneOf(['single', 'multiple', ''], responseMessages.INVALID_VALUE_FOR_BOOKING_TYPE),
      capacity: yup.number().integer().positive().nullable(true),
      count: yup.number().integer().positive().nullable(true)
    })
  });
  validator(req, res, schema, next);
};

module.exports = {
  addCourt
};
