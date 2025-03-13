import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = (props: {toggleRegister: () => void}) => {
  const {handleLogin} = useUserContext();
  const {toggleRegister} = props;

  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <div className="mx-auto my-10 flex w-4/5 flex-col items-center justify-center">
        <h2 className="my-5 self-start">Kirjaudu sisään</h2>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="LoginUsername">Käyttäjänimi</label>
            <input
              className="my-2 rounded-md border border-emerald-600 p-2.5"
              name="username"
              type="text"
              id="LoginUsername"
              onChange={handleInputChange}
              autoComplete="username"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="loginpassword">Salasana</label>
            <input
              className="my-2 rounded-md border border-emerald-600 p-2.5"
              name="password"
              type="password"
              id="loginpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="my-5 cursor-pointer rounded-3xl bg-emerald-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
          >
            Kirjaudu sisään
          </button>
          <hr className="text-stone-300" />
          <button
            onClick={toggleRegister}
            className="my-5 cursor-pointer rounded-3xl bg-emerald-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
          >
            Rekisteröidy
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
