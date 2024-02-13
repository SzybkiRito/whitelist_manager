import logo from '../../assets/images/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-white flex flex-col lg:flex-row justify-evenly items-center lg:items-start flex-wrap gap-10 lg:gap-0 select-none ">
      <div className="p-6 flex flex-col flex-1 items-center lg:items-start">
        <div className="flex items-center">
          <img src={logo} alt="logo" />
          <div className="flex flex-col pl-6">
            <h4 className="outfit-bold text-3xl">Region Roleplay</h4>
            <h4 className="outfit-regular text-2xl">South Central</h4>
          </div>
        </div>
        <span>
          RegionRoleplay is not affiliated with or endorsed by Rockstar North,
          Take-Two Interactive or other rightsholders. Any trademarks used
          belong to their respective owners. RegionRoleplay reserves all rights
          on rightly owned images and other visual content provided by Region
          Roleplay.
        </span>
      </div>
      <div className="flex flex-col flex-1 lg:p-12">
        <h6 className="outfit-bold text-2xl">Link & Resources</h6>
        <ul className="flex items-center flex-col gap-2 lg:gap-0 lg:items-start">
          <li className="text-blackLight cursor-pointer hover:text-orange">
            Home
          </li>
          <li className="text-blackLight cursor-pointer hover:text-orange">
            Rules
          </li>
          <li className="text-blackLight cursor-pointer hover:text-orange">
            Discord
          </li>
          <li className="text-blackLight cursor-pointer hover:text-orange">
            Whitelist
          </li>
        </ul>
      </div>
      <div className="flex flex-col flex-1 lg:p-12">
        <h6 className="outfit-bold text-2xl">Need Help?</h6>
        <ul className="flex items-center flex-col gap-2 lg:gap-0 lg:items-start">
          <li className="text-blackLight cursor-pointer hover:text-orange">
            Terms & Conditions
          </li>
          <li className="text-blackLight cursor-pointer hover:text-orange">
            Privacy Policy
          </li>
        </ul>
      </div>
      <div className="flex flex-col flex-1 lg:p-12 pb-5">
        <h6 className="outfit-bold text-2xl">Follow Us</h6>
        <ul className="flex items-center flex-col gap-2 lg:gap-0 lg:items-start">
          <li className="text-blackLight cursor-pointer hover:text-orange">
            TikTok
          </li>
        </ul>
      </div>
    </footer>
  );
}
