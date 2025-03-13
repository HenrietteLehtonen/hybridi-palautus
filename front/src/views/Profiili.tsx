import {
  faCalendar,
  faEnvelope,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {useUserContext} from '../hooks/contextHooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Profiili = () => {
  const {user} = useUserContext();

  return (
    <>
      <div className="mx-auto my-10 w-4/5 max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-emerald-600">Profiili</h2>
        <hr />

        {/* Ehdollinen renderöinti */}
        {user && (
          <div className="m-5 space-y-4">
            <p className="text-lg">
              <span className="font-semibold">
                <FontAwesomeIcon
                  icon={faUser}
                  className="m-1 text-emerald-600"
                />
              </span>{' '}
              {user.username}
            </p>
            <p className="text-lg">
              <span className="font-semibold">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="m-1 text-emerald-600"
                />
              </span>{' '}
              {user.email}
            </p>
            <p className="text-lg">
              <span className="font-semibold">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="m-1 text-emerald-600"
                />
              </span>{' '}
              {new Date(user.created_at).toLocaleString('fi-FI')}
            </p>
            {/* <p className="text-lg">
              <span className="font-semibold">User ID:</span> {user.user_id}
            </p> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Profiili;
