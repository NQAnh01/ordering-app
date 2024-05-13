'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const session = useSession();
  console.log('session: ', session);
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated') {
      setUsername(session?.data?.user?.name);
      setAvatar(session?.data?.user?.image);
      fetch('api/profile').then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setAddress(data.address);
        });
      });
    }
  }, [session, status]);

  const handleProfileUpdate = async (ev) => {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          image: avatar,
          phone,
          address,
        }),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile updated successfully',
      error: 'Error when updating profile',
    });
  };

  const handleChangeAvatar = async (ev) => {
    ev.preventDefault();
    const image = ev.target.files[0];
    if (image) {
      const data = new FormData();
      const nameImg = session.data.user.email.split('@')[0];
      data.append('nameImg', nameImg);
      data.append('image', image);
      const loadingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('api/upload', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          // Extract the imageUrl from the response
          const imageUrl = await response.json();
          setAvatar(imageUrl);
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

  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Profile page</h1>
      <form className='max-w-md mx-auto' onSubmit={handleProfileUpdate}>
        <div className='flex gap-4 '>
          <div>
            <div className='p-2 rounded-lg relative max-w-[120px]'>
              {avatar && (
                <Image
                  className='rounded-lg h-full w-full'
                  src={avatar}
                  width={250}
                  height={250}
                  alt={'avatar'}
                />
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
            </div>
          </div>
          <div className=' grow'>
            <div>
              <label>Full name</label>
              <input
                type='text'
                value={username}
                placeholder='First and last name'
                onChange={(ev) => {
                  setUsername(ev.target.value);
                }}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type='email'
                disabled={true}
                placeholder={session.data?.user.email}
              />
            </div>
            <div>
              <label>Phone number</label>
              <input
                type='tel'
                value={phone}
                placeholder='input your phone number'
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
            <div>
              <label>Address</label>
              <textarea
                name='address'
                id='address'
                value={address}
                placeholder='Address'
                className='max-h-20'
                onChange={(ev) => setAddress(ev.target.value)}
              />
            </div>

            <button type='submit'>Save</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
