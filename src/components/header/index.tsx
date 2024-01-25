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

  const user = useSelector((state) => state?.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
      className='w-full absolute flex justify-between z-20'
      ref={dropdownRef}
    >
      <img
        className=' top-0 left-0 w-40 mt-4 ml-4 z-20'
        src={LogoImg}
        alt='Logo'
        width={190}
        height={160}
      />
      {user && (
        <div className='flex items-center justify-center gap-6 pr-4'>
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
              className='text-white flex items-center gap-2 justify-center px-4 py-1 rounded-sm transition-all bg-[#77A99C] hover:bg-[#63988a]'
              onClick={() => {
                navigate('/searchgpt');
              }}
            >
              <FaSearch /> Search via GPT
            </button>
          )}

          <img
            className='w-12 h-12  cursor-pointer rounded-sm'
            src={AvatarImg}
            onClick={() => {
              console.log('Setting dropdown ', !isDropdownOpen);
              setIsDropdownOpen(!isDropdownOpen);
            }}
          ></img>
          {isDropdownOpen && (
            <div className='absolute top-16 pt-1 right-0  px-2'>
              <div className='z-10 text-white bg-red-500 border border-red divide-y divide-gray-100 rounded-md  shadow w-44 dark:bg-gray-700'>
                <button
                  onClick={signOut}
                  className='w-full block px-4 py-2 hover:rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
