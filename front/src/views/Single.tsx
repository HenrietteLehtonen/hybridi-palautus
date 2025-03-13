import {MediaItemWithOwner} from '../types/src/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import Comments from '../components/Comments';
import CommentCount from '../components/CommentCount';
import Ratings from '../components/Ratings';
import MediasTags from '../components/TagsperMedia';
// import Tags from '../components/Tags';

export const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;

  console.log(item.media_id);

  // Kommenttien tykkäykset

  return (
    <>
      <button
        className="mt-2 mb-2 cursor-pointer rounded-sm bg-emerald-500 p-1 text-stone-50"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>

      <div className="mb-10 flex flex-col items-center justify-center bg-[#fff] pb-20">
        {item.media_type.includes('image') ? (
          <img
            className="max-h-120 w-fit"
            src={item.filename}
            alt={item.title}
          />
        ) : (
          <video src={item.filename} controls className="max-h-120" />
        )}
        <h2>{item.title}</h2>
        <div className="flex flex-row items-center gap-5 text-stone-500">
          <Likes item={item} />
          <Ratings item={item} />
          <CommentCount item={item} />

          <div>
            Reseptin lisääjä: <strong>{item.username}</strong>
          </div>
        </div>
        <p className="my-5 px-10 py-5 font-bold">{item.description}</p>

        <div className="mb-10 flex w-full max-w-4xl flex-col items-baseline justify-center gap-5 pb-5 md:flex-col lg:flex-row">
          {/* ainekset */}
          <div className="max-w-xl flex-1 px-10" style={{flex: 1}}>
            <h2>Ainekset</h2>
            <ul>
              {item.ingredients.split(',').map((ing, index) => (
                <>
                  <li className="p-1" key={index}>
                    {ing.trim()}
                  </li>
                  <hr className="text-stone-200"></hr>
                </>
              ))}
            </ul>
          </div>
          {/* ohje */}
          <div className="max-w-xl flex-1 px-10 sm:flex-2 md:flex-1 lg:flex-2">
            <h2>Ohje</h2>
            <p className="text-base/7">{item.recipe}</p>
          </div>
        </div>
        <div className="flex w-[80%] items-center justify-center border-b-2 border-stone-300 pb-10">
          <MediasTags media_id={item.media_id} />
        </div>

        <Comments item={item} />
      </div>
    </>
  );
};
export default Single;
