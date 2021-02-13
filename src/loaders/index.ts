import expressLoader from './express';
import Logger from '../loaders/logger';
import { Container } from 'typedi';
import LoggerInstance from '../loaders/logger';

export default async ({ expressApp }) => {
  Container.set('logger', LoggerInstance);

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
