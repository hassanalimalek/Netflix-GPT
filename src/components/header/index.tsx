import { useEffect, useRef, useState } from 'react';
import LogoImg from '@/assets/logo.png';
import AvatarImg from '@/assets/avatar-img.webp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state: any) => state?.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const authFunc = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user?.email,
            uid: user?.uid,
            displayName: user?.displayName,
          })
        );
        navigate(
          (location.pathname === '/login' ? '/' : location.pathname) || '/'
        );
      } else {
        navigate('/login');
      }
    });
    // Used to change auth state when component unmounts
    return () => {
      authFunc();
    };
  }, []);

  const signOut = () => {
    auth.signOut();
    dispatch(logout());
  };
  return (
    <div
      className='bg-black md:bg-transparent w-full absolute flex items-center justify-between z-20'
      ref={dropdownRef as React.RefObject<HTMLDivElement>}
    >
      <img
        className=' top-0 left-0 w-32 md:w-40 mt-4 ml-4 z-20'
        src={LogoImg}
        alt='Logo'
        width={190}
        height={160}
      />
      {user && (
        <div className='mt-3 md:mt-0 flex items-center justify-center gap-6 pr-4 '>
          {location.pathname == '/searchgpt' ? (
            <button
              className='text-white flex items-center gap-2 justify-center px-4 py-1 rounded-sm transition-all bg-[#D72634] hover:bg-[#e03d4b]'
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </button>
          ) : (
            <button
              className='text-white flex items-center gap-2 justify-center px-4 py-2 rounded-sm transition-all bg-[#77A99C] hover:bg-[#63988a]'
              onClick={() => {
                navigate('/searchgpt');
              }}
            >
              <FaSearch />
              <span className='hidden md:block'> Search via GPT</span>
            </button>
          )}

          <img
            className='w-8 h-8 md:w-12 md:h-12  cursor-pointer rounded-sm'
            src={AvatarImg}
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
          ></img>
          {isDropdownOpen && (
            <div className='absolute top-16 pt-2 right-0 px-2 w-72'>
              <div
                id='dropdownInformation'
                className='z-10 w-full  bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600'
              >
                <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                  <div className='font-semibold text-md'>
                    {user?.displayName}
                  </div>
                  <div
                    className='font-medium text-wrap'
                    style={{ overflowWrap: 'break-word' }}
                  >
                    {user?.email}
                  </div>
                </div>

                <div className='py-2'>
                  <span
                    onClick={signOut}
                    className='block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Sign out
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
