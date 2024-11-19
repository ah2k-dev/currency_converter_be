import Joi from 'joi';

const currencyConversionSchema = Joi.object({
  from: Joi.string().required().messages({
    'string.base': 'From currency must be a string',
    'string.empty': 'From currency cannot be an empty field',
    'any.required': 'From currency is required'
  }),
  to: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'To currency must be an array',
    'array.empty': 'To currency cannot be an empty field',
    'any.required': 'To currency is required'
  }),
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'number.empty': 'Amount cannot be an empty field',
    'any.required': 'Amount is required'
  })
});

export { currencyConversionSchema };
