const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center border-t py-10">
      <div className="flex items-center flex-col w-full max-w-[1280px] gap-5">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-5 lg:items-start">
          <div className="flex justify-center">
            <img className="max-w-[222px]" src="logo.svg" alt="" />
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <button>About</button>
            <button>How it works</button>
            <button>FAQ</button>
          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-start w-full gap-5">
          <img src="Facebook.svg" alt="" />
          <img src="Instagram.svg" alt="" />
          <img src="X.svg" alt="" />
          <img src="LinkedIn.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
