import {ChangeEvent, useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useRef} from 'react';
//import {useNavigate} from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const fileRef = useRef<HTMLInputElement>(null);
  //const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  // const {postTag} = useTag();

  const initValues = {
    title: '',
    description: '',
    ingredients: '',
    recipe: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver and post metadata to media api server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // lisätään tägi

      // await postTag(inputs.tag_name, mediaResult.message., token);

      // redirect to Home
      //navigate('/');

      // OR notify user & clear inputs
      setUploadResult('Resepti lisätty!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    setErrors({});
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1>Lisää resepti</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 flex w-4/5 flex-col items-center justify-center gap-5"
      >
        <div className="flex w-full flex-col">
          <label htmlFor="title">Nimi</label>
          <input
            className="my-2 rounded-md border border-emerald-600 p-2.5"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
            required
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="description">Kuvaus:</label>
          <textarea
            className="my-2 rounded-md border border-emerald-600 p-2.5"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="ingredients">Ainekset: (erota pilkulla)</label>
          <textarea
            className="my-2 rounded-md border border-emerald-600 p-2.5"
            name="ingredients"
            rows={5}
            id="ingredients"
            onChange={handleInputChange}
            value={inputs.ingredients}
          ></textarea>
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="recipe">Ohje:</label>
          <textarea
            className="my-2 rounded-md border border-emerald-600 p-2.5"
            name="recipe"
            rows={5}
            id="recipe"
            onChange={handleInputChange}
            value={inputs.recipe}
          ></textarea>
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="file">Tiedosto</label>
          <input
            className="my-2 rounded-md border border-emerald-600 p-2.5"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            // reference useRef hookille
            ref={fileRef}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          className="my-1 w-80 cursor-pointer rounded-3xl bg-emerald-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
          disabled={
            file &&
            inputs.title.length > 3 &&
            inputs.description.length > 0 &&
            inputs.ingredients.length > 3 &&
            inputs.recipe.length > 3
              ? false
              : true
          }
        >
          {uploading ? 'Reseptiä lisätään...' : 'Lisää resepti'}
        </button>
        <button
          type="reset"
          className="my-1 w-80 cursor-pointer rounded-3xl bg-red-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
          onClick={resetForm}
        >
          Tyhjennä
        </button>
        <p>{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
