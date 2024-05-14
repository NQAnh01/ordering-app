import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

const EditableImage = ({ link, setLink, nameImg }) => {
  const handleChangeAvatar = async (ev) => {
    ev.preventDefault();
    const image = ev.target.files[0];
    if (image) {
      const data = new FormData();
      data.append('nameImg', nameImg);
      data.append('image', image);

      const loadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          const imageUrl = await response.json();
          setLink(imageUrl);
          resolve();
        } else reject();
      });

      await toast.promise(loadingPromise, {
        loading: 'Uploading...',
        success: 'upload successfully',
        error: 'Error when upload image',
      });
    }
  };
  return (
    <>
      {link && (
        <Image
          className='rounded-lg h-full w-full'
          src={link}
          width={250}
          height={250}
          alt={'avatar'}
        />
      )}
      {!link && (
        <div className='text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1'>
          No image
        </div>
      )}
      <label>
        <input
          id='fileInput'
          type='file'
          className='hidden'
          onChange={handleChangeAvatar}
        />
        <span className='text-center block rounded-lg border border-gray-100 p-1 cursor-pointer'>
          Change
        </span>
      </label>
    </>
  );
};

export default EditableImage;
