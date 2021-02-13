import { Router } from 'express';
import rent from './routes/rent';

export default () => {
  const app = Router();
  rent(app);
  return app;
};
