import { MenuItem } from '@/models/MenuItems';
import mongoose from 'mongoose';

export const POST = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  const menuItemsDoc = MenuItem.create(data);

  return Response.json(menuItemsDoc);
};

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();

  await MenuItem.findByIdAndUpdate(_id, data);

  return Response.json('ok');
};

export const GET = async () => {
  mongoose.connect(process.env.MONGO_URL);

  const menuItemsDoc = await MenuItem.find();

  return Response.json(menuItemsDoc);
};

// export const GET_ONE = async (req) => {
//   mongoose.connect(process.env.MONGO_URL);
//   const { id } = req.params;

//   console.log('GET_ONE: ', id);

//   const menuItemDoc = await MenuItem.findById({ _id: id });

//   if (!menuItemDoc) {
//     return Response.json({ error: 'Menu item not found' }, { status: 404 });
//   }

//   return Response.json(menuItemDoc);
// };
