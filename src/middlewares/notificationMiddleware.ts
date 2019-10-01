import { Request, Response } from 'express';
import { parse } from 'useragent';
import { sendNotification } from 'web-push';
import { DEMO_USER } from '../config';
import { addSubscription } from '../db/api';
import { User } from '../db/interfaces';

export const notificationMiddleware = async (req: Request, res: Response) => {
  const {
    subscriptionData,
    options = {
      silent: false,
    },
  } = req.body;
  const { family: userAgent, os: { family: userDeviceType } } = parse(req.headers['user-agent']);
  const { id: ownerId } = req.user as User || DEMO_USER;
  await addSubscription(ownerId, subscriptionData, userAgent, userDeviceType);

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Welcome to LifeApp!',
    notification: {
      body: 'This notification is test.' +
        ' It will be send always after entering page if notifications were allowed on this page.',
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  if (!options.silent) {
    // Pass subscription into sendNotification
    await sendNotification(subscriptionData, payload);
  }
};
