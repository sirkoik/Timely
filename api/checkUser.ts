import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { connectMongoDb } from '../common/ConnectMongoDB';
import { User } from '../common/models/User';

const handler = async (request: VercelRequest, response: VercelResponse) => {
  // if (request.method !== 'POST')

  await connectMongoDb();

  const { username: requestUsername } = request.query;

  const existingUsernames = await User.find({ username: requestUsername });

  const output = { userExists: existingUsernames.length > 0 };
  response.status(200).json(output);
};

export default handler;
