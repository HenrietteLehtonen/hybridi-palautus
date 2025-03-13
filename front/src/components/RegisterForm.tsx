import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';
import {RegisterCredentials} from '../types/LocalTypes';
// import {useNavigate} from 'react-router';

const RegisterForm = (props: {toggleRegister: () => void}) => {
  // käytetaan 2 ekaa tsekkaa onks nimi ja ssposti käytttävissä
  const [usernameAvailable, setUserNameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  // rekisteröinnin state
  const [register, setRegister] = useState(false);
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser(); // {mitä kutsutaan useUser Hookista}
  const {toggleRegister} = props;

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    // apiHooks to login
    console.log(inputs);
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      // jos onnistu vaihetaan false -> true
      resetForm();
      setRegister(true);

      // jos rekisteröinti onnistuu -> vaihetaan kirjaudu sisään 5sek
      // setTimeout(() => {
      //   toggleRegister();
      // }, 5000);

      console.log('doRegister result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doRegister,
    initValues,
  );

  // formin tyhjennys
  const resetForm = () => {
    setInputs(initValues);
  };

  useEffect(() => {
    const main = async () => {
      // kutsu getUsernameAvailable apiHooksista
      try {
        if (inputs.username.length > 2) {
          const result = await getUsernameAvailable(inputs.username);
          setUserNameAvailable(result.available ?? true);
        } else {
          setUserNameAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setUserNameAvailable(true);
      }
    };

    main();
  }, [inputs.username, getUsernameAvailable]);

  useEffect(() => {
    const main = async () => {
      try {
        const result = await getEmailAvailable(inputs.email);
        setEmailAvailable(result.available ?? true);
      } catch (error) {
        console.error(error);
      }
    };
    main();
  }, [inputs.email]);

  return (
    <>
      <div className="mx-auto my-10 flex w-4/5 flex-col items-center justify-center">
        <h2 className="self-start">Rekisteröidy keittokirjan käyttäjäksi</h2>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="RegisterUsername">Käyttäjätunnus</label>
            <input
              className="my-2 rounded-md border border-emerald-600 p-2.5"
              name="username"
              type="text"
              id="RegisterUsername"
              onChange={handleInputChange}
              autoComplete="username"
              required
            />
            {!usernameAvailable && (
              <p className="text-red-700">Käyttäjätunnus ei saatavilla!</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="registerpassword">Salasana</label>
            <input
              className="my-2 rounded-md border border-emerald-600 p-2.5"
              name="password"
              type="password"
              id="registerpassword"
              onChange={handleInputChange}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="registerEmail">Email</label>
            <input
              className="my-2 rounded-md border border-emerald-600 p-2.5"
              name="email"
              type="text"
              id="registerEmail"
              onChange={handleInputChange}
              autoComplete="current-email"
              required
            />
            {!emailAvailable && (
              <p className="text-red-700">Email not available!</p>
            )}
          </div>

          <button
            type="submit"
            className="my-5 cursor-pointer rounded-3xl bg-emerald-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
          >
            Rekisteröidy
          </button>
          {register && (
            <p className="font-extrabold text-green-700">
              Rekisteröini onnistui!
            </p>
          )}
          <hr className="text-stone-300" />
          <button
            onClick={toggleRegister}
            className="my-5 cursor-pointer rounded-3xl bg-emerald-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
          >
            Tunnus olemassa? Kirjaudu sisään
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
