'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      console.error('Email and password are required');
      return;
    }
    console.log('Email', email, password);

    setLoginInProgress(true);

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });

    setLoginInProgress(false);
  };

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Login</h1>
      <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Email'
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type='submit' disabled={loginInProgress}>
          Login
        </button>
        <div className='my-4 text-center text-gray-500'>or login with provider</div>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className='flex gap-4 justify-center'
        >
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
