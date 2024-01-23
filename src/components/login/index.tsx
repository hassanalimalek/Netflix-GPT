import { Header } from '../header';
import LoginBgImg from '../../assets/login_bg.jpg';
import { useRef, useState } from 'react';
import { validateSignInData, validateSignUpData } from '../../util/general';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';

export const Login = () => {
  const [formMode, setFormMode] = useState<'signin' | 'signup'>('signin');
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;
    // Signing In
    if (formMode === 'signin') {
      const validity = validateSignInData(
        emailRef.current?.value,
        passwordRef.current?.value
      );
      setErrorMessage(validity);
      if (validity === null) {
        setLoading(true);
        signInWithEmailAndPassword(auth, email as string, password as string)
          .then(() => {
            // Signed in
            toast.success('Successfully Signed in!');
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    // Signing Up
    else {
      const validity = validateSignUpData(
        usernameRef.current?.value,
        emailRef.current?.value,
        passwordRef.current?.value
      );

      if (validity === null) {
        setErrorMessage(null);
        setLoading(true);
        createUserWithEmailAndPassword(
          auth,
          email as string,
          password as string
        )
          // Updating user display name
          .then((userCredential) => {
            // Signed up
            const userSignedUp = userCredential.user;
            if (userSignedUp) {
              updateProfile(userSignedUp, {
                displayName: username,
              })
                .then(() => {
                  // Update successful.
                  toast.success('Successfully Signed up!');

                  setFormMode('signin');
                  clearInputs();
                })
                .catch(function (error) {
                  console.log('Error -->', error);
                  // An error happened.
                })
                .finally(() => {
                  setLoading(false);
                });
            }
          })
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });
      } else {
        setErrorMessage(validity);
      }
    }
  };
  const clearInputs = () => {
    usernameRef.current!.value = '';
    passwordRef.current!.value = '';
    emailRef.current!.value = '';
  };
  return (
    <div>
      <Header />
      <div className='absolute min-h-lvh'>
        <img src={LoginBgImg} className='brightness-50 min-h-screen'></img>
      </div>
      <div className='absolute p-12 min-w-96 max-w-[80%] w-3/12 mx-auto left-0 right-0 my-36 bg-black bg-opacity-60 rounded text-white '>
        <h2 className='text-3xl font-semibold mb-8'>
          {formMode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        <input
          className='mb-6 px-4 py-3 rounded-sm w-full text-black'
          type='text'
          placeholder='Email'
          ref={emailRef}
        />
        {formMode === 'signup' && (
          <input
            className='mb-6 px-4 py-3 rounded-sm w-full text-black'
            type='text'
            placeholder='Username'
            ref={usernameRef}
          />
        )}
        <input
          className='mb-4 px-4 py-3 rounded-sm w-full text-black'
          type='password'
          placeholder='Password'
          ref={passwordRef}
        />

        <p className='text-red-500 mb-6'>{errorMessage ? errorMessage : ''}</p>

        <button
          className='w-full bg-red-700 py-3 rounded-md mb-10 '
          onClick={handleSubmit}
        >
          {loading && (
            <>
              <svg
                aria-hidden='true'
                role='status'
                className='inline mr-3 w-6 h-6 text-white animate-spin'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='#E5E7EB'
                ></path>
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentColor'
                ></path>
              </svg>
            </>
          )}
          {formMode === 'signin' ? 'Sign In' : 'Sign Up'}
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
