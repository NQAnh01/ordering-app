'use client';
import { useProfile } from '@/components/UseProfile';
import UserTabs from '@/components/layouts/UserTabs';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Categories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategoryList(categories);
      });
    });
  };

  const handleCategorySubmit = async (ev) => {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editCategory) {
        data._id = editCategory._id;
      }
      const response = await fetch('api/categories', {
        method: editCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
        }),
      });

      setCategoryName('');
      fetchCategories();
      setEditCategory(null);

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: editCategory ? 'Updating category...' : 'Creating your new category...',
      success: editCategory ? 'Category updated' : 'Category created',
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
    <section className='mt-8 max-w-lg mx-auto'>
      <UserTabs isAdmin={data.admin} />
      <form className='mt-8' onSubmit={handleCategorySubmit}>
        <div className='flex gap-2 items-end'>
          <div className='grow'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              {editCategory ? 'Update category' : 'New category name'}
              {editCategory && (
                <>
                  : <b>{editCategory.name}</b>
                </>
              )}
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              type='text'
              value={categoryName}
              placeholder='Category'
              onChange={(ev) => {
                setCategoryName(ev.target.value);
              }}
            />
          </div>
          <div className='pb-2'>
            <button type='submit' className='border border-primary'>
              {editCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className='mt-8 text-sm text-gray-500'>Existing categories</h2>
        {categoryList &&
          categoryList.map((category) => (
            <div
              key={category.id}
              className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center'
            >
              <div className='grow'>{category.name}</div>
              <div className='flex gap-1'>
                <button
                  type='button'
                  onClick={() => {
                    setEditCategory(category);
                    setCategoryName(category.name);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Categories;
