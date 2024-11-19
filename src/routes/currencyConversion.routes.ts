import express from 'express';
import * as currencyConversionController from '../controllers/currencyconversion.controller';
import { validate } from '../middleware/validate.middleware';
import { currencyConversionSchema } from '../validations/currencyconversion.schema';

const router = express.Router();

router.post(
  '/',
  validate(currencyConversionSchema),
  currencyConversionController.currencyConversion
);

router.get('/', currencyConversionController.getCurrencies);

export default router;
