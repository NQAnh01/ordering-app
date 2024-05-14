'use client';
import React, { useEffect, useState } from 'react';
import UserTabs from '@/components/layouts/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Link from 'next/link';
import { Right } from '@/components/icons/Icon';
import Image from 'next/image';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!data.admin) {
    return <h1>You are not an admin</h1>;
  }

  return (
    <section className='mt-8 max-w-lg mx-auto'>
      <UserTabs isAdmin={data.admin} />
      <div className='mt-8'>
        <Link className='button flex' href={'/menu-items/new'}>
          <span>Crete new menu item</span>
          <Right />
        </Link>
      </div>

      <div>
        <h2 className='text-sm text-gray-500 mt-8'>Edit menu item:</h2>
        <div className='grid grid-cols-3 gap-2'>
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={'/menu-items/edit/' + item._id}
                className='bg-gray-200 rounded-lg p-4'
              >
                <div className='relative text-center'>
                  <Image
                    className='rounded-md'
                    src={item.image}
                    alt={''}
                    width={200}
                    height={200}
                  />
                </div>
                <div className='text-center '>{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
