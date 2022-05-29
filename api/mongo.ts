import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectMongoDb } from '../common/ConnectMongoDB';
import { User } from '../common/models/User';

const handler = async (
  request: VercelRequest,
  response: VercelResponse,
  next: any
) => {
  // if (request.method !== 'POST')

  await connectMongoDb();

  const { username: requestUsername, password: requestPassword } =
    request.query;

  const user1 = new User({
    username: requestUsername,
    password: requestPassword,
  });

  const existingUsernames = await User.find({ username: requestUsername });

  let userExists = false;
  if (existingUsernames.length < 1) {
    await user1.save();
    console.log('saved user');
  } else {
    console.log(`user ${requestUsername} already exists.`);
    userExists = true;
  }

  const output = { userExists: userExists };
  response.status(200).send(output);
};

export default handler;
