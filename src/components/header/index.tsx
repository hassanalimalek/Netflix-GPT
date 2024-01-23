import LogoImg from '../../assets/logo.png';
export const Header = () => {
  return (
    <div>
      <img
        className='absolute top-0 left-0 w-40 mt-4 ml-4 z-10'
        src={LogoImg}
        alt='Logo'
        width={190}
        height={160}
      />
    </div>
  );
};
