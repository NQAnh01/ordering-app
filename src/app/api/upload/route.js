import { storage } from '@/app/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const nameImg = data.get('nameImg');
    const image = data.get('image');

    const storageRef = ref(storage, `images/avatar/${nameImg}`);
    uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);
    return Response.json(imageUrl);
  } catch (error) {
    console.error('Error uploading file to Drive:', error);
    return Response.json({ error: 'Failed to upload file to Google Drive' });
  }
};
