import { storage } from '@/app/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const POST = async (req) => {
  try {
    // Get info image
    const data = await req.formData();

    const nameImg = data.get('nameImg');
    const image = data.get('image');

    //upload the image
    const storageRef = ref(storage, nameImg);
    await uploadBytes(storageRef, image);

    //get the url of the image
    const imageUrl = await getDownloadURL(storageRef);

    return Response.json(imageUrl);
  } catch (error) {
    console.error('Error uploading:', error);
    return Response.json({ error: 'Failed to upload image!' });
  }
};
