import { Header } from '../header';
import LoginBgImg from '../../assets/login_bg.jpg';
import { useState } from 'react';

export const Login = () => {
  const [formMode, setFormMode] = useState<'signin' | 'signup'>('signin');
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={LoginBgImg} className='brightness-50'></img>
      </div>
      <div className='absolute p-12 w-3/12 mx-auto left-0 right-0 my-36 bg-black bg-opacity-60 rounded text-white '>
        <h2 className='text-3xl font-semibold mb-8'>
          {formMode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        <input
          className='mb-6 px-4 py-3 rounded-sm w-full'
          type='text'
          placeholder='Username'
        />
        <input
          className='mb-10 px-4 py-3 rounded-sm w-full'
          type='password'
          placeholder='Password'
        />
        <button className='w-full bg-red-700 py-3 rounded-md mb-8'>
          Sign In
        </button>
        <p
          className='text-gray-400 cursor-pointer'
          onClick={() => {
            setFormMode(formMode === 'signin' ? 'signup' : 'signin');
          }}
        >
          {formMode === 'signin' ? (
            <span>
              New to Netflix? <span className='text-white'>Sign up Now</span>
            </span>
          ) : (
            <span>
              Already a user?
              <span className='text-white'> Sign in Now</span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
