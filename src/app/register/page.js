'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>
        Register
      </h1>
      <div className='my-4 text-center'>
        User created.
        <br />
        Now you can{' '}
        <Link
          className='underline'
          href={'/login'}
        >
          Login &raquo;
        </Link>
      </div>
      <form
        className='block max-w-xs mx-auto'
        onSubmit={handleFormSubmit}
      >
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={(ev) =>
            setEmail(ev.target.value)
          }
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(ev) =>
            setPassword(ev.target.value)
          }
        />
        <button type='submit'>Register</button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button className='flex gap-4 justify-center'>
          <Image
            src={'/google.png'}
            alt={''}
            width={24}
            height={24}
          />
          Login with google
        </button>
        <div className='text-center my-4 text-gray-500 border-t pt-4'>
          Existing account?{' '}
          <Link
            className='underline'
            href={'/login'}
          >
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
