import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  // todo: kutsu handleLogout useEffectin sisällä

  const {handleLogout} = useUserContext();
  useEffect(() => {
    /// handlelogout
    handleLogout();
  }, []);
  return <div>Kirjaudu ulos</div>;
};

export default Logout;
