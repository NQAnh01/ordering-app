import React from 'react';

const MenuItem = () => {
  return (
    <div
      className='
    bg-gray-100 p-4 rounded-lg text-center
     hover:bg-white hover:shadow-md
      hover:shadow-black/25 transition-all'
    >
      <div className='text-center'>
        <img
          src='/vongtay.png'
          className=' max-h-auto max-h-48 block mx-auto'
          alt='Bracelet'
        />
      </div>
      <h4 className=' font-semibold text-xl my-3'>
        Vong tay ngu sac
      </h4>
      <p className='text-gray-500 text-sm'>
        Vòng tay được chạm khắc tinh tế với Tất cả
        điều tốt đẹp để mang lại nhiều niềm vui và
        ý nghĩa cho người sử dụng.
      </p>
      <button className='mt-4 bg-primary text-white rounded-full px-8 py-2'>
        235.200d
      </button>
    </div>
  );
};

export default MenuItem;
