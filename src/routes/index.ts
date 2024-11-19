import express, { Router } from 'express';
import currencyConversionRoutes from './currencyConversion.routes';
const router: Router = express.Router();

router.use('/currency-conversion', currencyConversionRoutes);

export default router;
