import React from 'react';

const LoadingComponent = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500'></div>
    </div>
  );
};

export default LoadingComponent;
