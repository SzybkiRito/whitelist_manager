import { useState } from 'react';
import { config } from '../../config';

export default function Navigation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="container flex items-center justify-center sm:justify-end">
      <ul className="flex flex-row gap-6 text-2xl">
        <li
          className={`cursor-pointer ${
            isHovered ? 'text-blackLight' : 'text-orange'
          }`}
        >
          <a href="/">Home</a>
        </li>
        <li
          className="text-blackLight hover:text-orange cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <a>Rules</a>
        </li>
        <li
          className="text-blackLight hover:text-orange cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <a href="https://discord.gg/bnFefVdtdH" target="_blank">
            Discord
          </a>
        </li>
        <li
          className="text-blackLight hover:text-orange cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <a href={config.DISCORD_OAUTH2_URL}>Whitelist</a>
        </li>
      </ul>
    </nav>
  );
}
