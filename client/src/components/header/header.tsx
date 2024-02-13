import { useCallback, useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { config } from '../../config';
import Navigation from '../navigation/navigation';

export default function Header() {
  const [serverData, setServerData] = useState<ResponseServerData>();

  type ResponseServerData = {
    isOffline: boolean;
    players?: number;
    maxClients?: number;
  };

  const fetchServerData = useCallback(async () => {
    try {
      const request = await fetch(
        `${config.BASE_FIVEM_API_URL}/servers/single/${config.FIVEM_SERVER_ID}`
      );
      const requestData = await request.json();

      setServerData({
        players: requestData.Data.clients,
        maxClients: requestData.Data.svMaxclients,
        isOffline: false,
      } as ResponseServerData);
    } catch (e) {
      setServerData({
        isOffline: true,
      } as ResponseServerData);
    }
  }, []);

  useEffect(() => {
    fetchServerData();
  }, [fetchServerData]);

  return (
    <header className="flex bg-white flex-wrap p-10 gap-5 sm:flex-nowrap">
      <div className="container flex items-center justify-center sm:justify-start">
        <img src={logo} alt="Logo" width="80" height="80" />
        <div className="flex flex-col items-start pl-6">
          <h3 className="outfit-bold text-2xl">
            Server Status:{' '}
            <span className="outfit-regular text-green">
              {serverData?.isOffline ? 'Offline' : 'Online'}
            </span>
          </h3>
          <h3 className="outfit-regular text-blackLight text-2xl">
            Players Online:{' '}
            <span className="outfit-bold text-black">
              {serverData?.isOffline
                ? ''
                : `${serverData?.players}/${serverData?.maxClients}`}
            </span>
          </h3>
        </div>
      </div>
      <Navigation />
    </header>
  );
}
