import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DiscordAuthenticatorService from '../services/DiscordAuthenticatorService';
import WhitelistPage from './WhitelistPage';
import Dashboard from './Dashboard';
import { DiscordUser } from '../interfaces/DiscordUser';

export default function AuthorizedPages() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAuthorized, setIsAutohirzed] = useState<boolean>();
  const [userData, setUserData] = useState<DiscordUser>();
  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      navigate('/');
      return;
    }

    const initializeAuthService = async () => {
      try {
        const authService = new DiscordAuthenticatorService();
        await authService.initialize(code);
        const jwtToken = await authService.parseJwt(
          localStorage.getItem('jwt_token')!
        );
        const isAuthorized = jwtToken.permissions.includes('ADMIN');
        setIsAutohirzed(isAuthorized);
        const userData = await authService.getDiscordUser();
        setUserData(userData);
      } catch (error) {
        if (import.meta.env.MODE === 'development')
          console.error('Error:', error);
        navigate('/');
      }
    };

    initializeAuthService();
  }, [navigate, searchParams]);

  if (isAuthorized) {
    return <Dashboard />;
  } else {
    return <WhitelistPage userData={userData!} />;
  }
}
