import mongoose from 'mongoose';

// connect to the MongoDB database.
// handle errors on connection, and after the connection has been established.
export const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // handle errors after connection is established.
    mongoose.connection.on('error', (err) => {
      // log error
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
};
