import LoginBgImg from '@/assets/login_bg.jpg';
import SearchGPT from '@/components/searchgpt';

export const SearchGptPage = () => {
  return (
    <div className=''>
      <div className='absolute min-h-lvh z-[-20]'>
        <img src={LoginBgImg} className='brightness-50 min-h-screen'></img>
      </div>
      <div className='pt-20'>
        <SearchGPT />
      </div>
    </div>
  );
};
