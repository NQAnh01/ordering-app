import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { User } from '@/models/User';

export const PUT = async (req) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    const data = await req.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data');
    }

    // Lấy thông tin phiên người dùng
    const session = await getServerSession(authOptions);
    const email = session.user?.email;
    if (!email) {
      throw new Error('User session not found');
    }

    // Kết nối đến MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    // if (Object.keys(update).length > 0) {
    const response = await User.updateOne({ email: email }, data);
    return Response.json(response);
  } catch (error) {
    // Xử lý lỗi và trả về phản hồi lỗi
    console.error('Error:', error.message);
    return Response.error(500, 'Internal Server Error');
  }
};

export const GET = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user?.email;

  const user = await User.findOne({ email });
  return Response.json(user);
};
