import React from 'react';

const ErrorComponent = () => {
  return (
    <>
      <div className='flex justify-center items-center header'>
        <h1 className='text-3xl font-light'>Oops! Something went wrong</h1>
      </div>

      <div className='flex justify-center items-center mt-4'>
        <p>This error may occured in api or something</p>
      </div>
    </>
  );
};

export default ErrorComponent;
