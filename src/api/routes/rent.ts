import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import RentSettingService from '../../services/rent';
import moment from 'moment';
import { celebrate, Joi } from 'celebrate';
const route = Router();

export default (app: Router) => {
  app.use('/rent', route);

  route.post(
    '/calculations/rentSchedule',
    celebrate({
      body: Joi.object({
        leaseStart: Joi.date().required(),
        leaseEnd: Joi.date().required(),
        monthlyRentAmount: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const rentServiceInstance = Container.get(RentSettingService);
      const logger = Container.get('logger');
      try {
        const { leaseStart, leaseEnd, monthlyRentAmount } = req.body;
        const { rent } = await rentServiceInstance.calculate(leaseStart, leaseEnd, monthlyRentAmount, []);
        return res.json({ success: true, data: rent }).status(200);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        logger.error('Error: %o', e);
        return next(e);
      }
    },
  );
};
