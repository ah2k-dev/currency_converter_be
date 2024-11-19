import SuccessHandler from '../utils/successHandler';
import ErrorHandler from '../utils/errorHandler';
import { RequestHandler } from 'express';
import axios from 'axios';

const currencyConversion: RequestHandler = async (req, res) => {
  // #swagger.tags = ['Currency Conversion']
  try {
    const { from, to, amount } = req.body;
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?base_currency=${from}&currencies=${to.length > 1 ? to.join(',') : to[0]}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apiKey: process.env.API_KEY
        }
      }
    );
    if (response.status !== 200) {
      throw new Error('Failed to convert currency');
    }
    Object.keys(response.data.data).forEach((key) => {
      response.data.data[key] = response.data.data[key] * amount;
    });
    return SuccessHandler({
      res,
      data: {
        message: 'Conversion Successful',
        conversions: response.data.data
      },
      statusCode: 200
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

const getCurrencies: RequestHandler = async (req, res) => {
  // #swagger.tags = ['Currency Conversion']
  try {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/currencies`,
      {
        headers: {
          'Content-Type': 'application/json',
          apiKey: process.env.API_KEY
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch currencies');
    }

    return SuccessHandler({
      res,
      data: {
        message: 'Currencies fetched successfully',
        currencies: Object.keys(response.data.data).map((key) => ({
          value: key,
          label: `${key} - ${response.data.data[key].name}`
        }))
      },
      statusCode: 200
    });
  } catch (error) {
    return ErrorHandler({
      message: (error as Error).message,
      statusCode: 500,
      req,
      res
    });
  }
};

export { currencyConversion, getCurrencies };
