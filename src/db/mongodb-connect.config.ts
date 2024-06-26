import mongoose from 'mongoose';

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB', (error as any)?.message);
  }
};

export default mongoConnect;
