import React from 'react';
import { Right } from '../icons/Icon';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className='hero mt-4'>
      <div className=' py-4'>
        <h1 className='text-4xl font-semibold'>
          You will be <br /> more beautiful <br /> with a&nbsp;
          <span className='text-primary'>Bracelet</span>
        </h1>
        <p className='my-4 text-gray-500 text-sm'>
          A bracelet is the missing piece that makes every outfit complete, a simple yet
          elegant joy in life.
        </p>
        <div className='flex gap-4 text-sm'>
          <button className='flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full'>
            Order now
            <Right />
          </button>
          <button className='flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold'>
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className='relative'>
        <Image
          src={'/Bracelet.png'}
          layout={'fill'}
          objectFit={'contain'}
          alt={'bracelet'}
        />
      </div>
    </section>
  );
};

export default Hero;
