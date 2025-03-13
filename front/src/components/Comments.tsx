// näytetään kommentit jos on kirjautunut

import {MediaItemWithOwner} from '../types/src/DBTypes';
import {useUserContext} from '../hooks/contextHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {useEffect, useRef} from 'react';
import {useComment} from '../hooks/apiHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  //
  const inputRef = useRef<HTMLInputElement | null>(null);

  // haetaan kirjautumistieto usercontekstista
  const user = useUserContext();
  // kommentit zustand storesta
  const {comments, setComments} = useCommentStore();
  // kommentit bäkkäristä
  const {postComment, getCommentsByMediaId} = useComment();
  // const [commentCount, setCommentCount] = useState(0);

  // kommentin lähettäminen
  // alkuarvo formille
  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    // postatataan kommentti
    await postComment(inputs.comment_text, item.media_id, token);
    getComments();
    // tyhjennä form
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setInputs(initValues);
  };

  // formin käsittely form hookilla
  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  // haetaan kommentit
  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      setComments([]);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getComments();
  }, [item]); // aina kun item vaihtuu ajetaan getComments uusiks

  return (
    <>
      <div className="my-5 flex w-full flex-col items-center">
        <h2 className="flex w-1/2 flex-col gap-5">Kommentit</h2>
        {comments.length > 0 && (
          <ul className="mb-8 flex w-1/2 flex-col gap-5">
            {comments.map((comment) => (
              <li key={comment.comment_id}>
                <strong>{comment.username} </strong>
                <span className="text-stone-500">
                  ({new Date(comment.created_at || '').toLocaleString('fi-FI')})
                </span>
                <br></br>
                {comment.comment_text}
              </li>
            ))}
          </ul>
        )}
        {user && (
          <form
            onSubmit={handleSubmit}
            className="my-5 flex w-1/2 flex-col gap-5"
          >
            <div className="flex flex-col">
              <label htmlFor="comment_text"></label>
              <input
                className="my-2 rounded-md border border-emerald-600 p-2.5"
                name="comment_text"
                type="text"
                id="comment_text"
                onChange={handleInputChange}
                autoComplete="username"
                ref={inputRef}
                placeholder="Lisää kommentti:"
              />
            </div>
            {/* <div>{commentCount}</div> */}

            <button
              disabled={inputs.comment_text.length == 0}
              className="cursor-pointer rounded-3xl bg-emerald-600 p-2 text-stone-50 transition-all duration-300 ease-in-out hover:bg-emerald-800"
            >
              Lähetä
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Comments;
