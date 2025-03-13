import {Link, Outlet} from 'react-router';
import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';

const book = <FontAwesomeIcon icon={faBookOpen} />;

export const Layout = () => {
  // jos käyttäjää ei ole kutsu handleAutoLogin
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    if (!user) {
      try {
        handleAutoLogin();
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  });

  return (
    <>
      <h1 className="font-bold">Keittokirja {book}</h1>
      <div>
        <nav className="w-full shadow-md">
          <ul className="m-0 flex list-none justify-end pr-10">
            <li>
              <Link
                className="block p-4 text-center text-emerald-600 hover:bg-stone-800 hover:underline"
                to="/"
              >
                Etusivu
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    className="block p-4 text-center text-emerald-600 hover:bg-stone-800"
                    to="/profile"
                  >
                    Profiili
                  </Link>
                </li>
                <li>
                  <Link
                    className="block p-4 text-center text-emerald-600 hover:bg-stone-800"
                    to="/upload"
                  >
                    Lisää resepti
                  </Link>
                </li>

                <li>
                  <Link
                    className="block p-4 text-center text-emerald-600 hover:bg-stone-800"
                    to="/Files"
                  >
                    Omat reseptit
                  </Link>
                </li>

                <li>
                  <Link
                    className="block p-4 text-center text-emerald-600 hover:bg-stone-800"
                    to="/Logout"
                  >
                    Kirjaudu ulos
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="block p-4 text-center text-emerald-600 hover:bg-stone-800"
                  to="/Login"
                >
                  Kirjaudu
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  );
};
