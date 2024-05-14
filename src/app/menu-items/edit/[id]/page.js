'use client';
import React, { useEffect, useState } from 'react';
import UserTabs from '@/components/layouts/UserTabs';
import { useProfile } from '@/components/UseProfile';
import EditableImage from '@/components/layouts/EditableImage';
import { v4 } from 'uuid';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Left } from '@/components/icons/Icon';
import { useParams, useRouter } from 'next/navigation';

const EditMenuItems = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const { loading, data } = useProfile();
  const router = useRouter();
  const { id } = useParams();

  const idMatch = decodeURIComponent(image)?.match(/\/([^/?]+)\?/);

  const nameImg = idMatch ? idMatch[1] : v4();

  useEffect(() => {
    fetch(`/api/menu-items`).then((res) => {
      res.json().then((items) => {
        const item = items.find((item) => item._id === id);
        setImage(item.image);
        setName(item.name);
        setDescription(item.description);
        setBasePrice(item.basePrice);
      });
    });
  }, [id]);

  const handleEditSubmit = async (ev) => {
    ev.preventDefault();
    const data = { _id: id, name, description, basePrice, image };
    const creatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    await toast.promise(creatingPromise, {
      loading: 'Creating your new item...',
      success: () => {
        router.push('/menu-items');
        return 'Item created';
      },
      error: 'Error, sorry...',
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!data.admin) {
    return <h1>You are not an admin</h1>;
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={true} />
      <div className='max-w-2xl mx-auto mt-8'>
        <Link href={'/menu-items'} className='button'>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form className='mt-8 max-w-md mx-auto' onSubmit={handleEditSubmit}>
        <div
          className='grid items-start gap-4'
          style={{ gridTemplateColumns: '.3fr .7fr' }}
        >
          <div>
            <EditableImage
              link={image}
              setLink={setImage}
              nameImg={`images/items/${nameImg}`}
            />
          </div>
          <div className='grow'>
            <label>Item name</label>
            <input
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
              }}
              type='text'
            />
            <label>Description</label>
            <input
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value);
              }}
              type='text'
            />
            <label>Base price</label>
            <input
              value={basePrice}
              onChange={(ev) => {
                setBasePrice(ev.target.value);
              }}
              type='text'
            />
            <button type='submit'>Save</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditMenuItems;
