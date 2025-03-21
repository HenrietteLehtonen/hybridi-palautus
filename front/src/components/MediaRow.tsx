import {MediaItemWithOwner} from '../types/src/DBTypes';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import CommentCount from './CommentCount';
import Ratings from './Ratings';
import {useMedia} from '../hooks/apiHooks';
import MediasTags from './TagsperMedia';

import Heart from './Heart';

type MediaItemProps = {
  item: MediaItemWithOwner;
  // single view
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {user} = useUserContext();
  const {item} = props;
  const {deleteMediabyID} = useMedia();

  // itemin poisto
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      if (!token) {
        return;
      }
      await deleteMediabyID(item.media_id, token);
      console.log('Item deleted', item.media_id);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  console.log(item.screenshots);

  return (
    <>
      <div className="relative">
        <Link to="/single" state={{item}} className="text-stone-800">
          <div className="h-[22rem] w-[18rem] overflow-hidden rounded-2xl border border-stone-300 bg-stone-50 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-2 sm:h-[22rem] sm:w-[20rem] md:h-[21rem] md:w-[25rem]">
            <img
              className="h-40 w-full rounded-t-2xl object-cover"
              src={
                // tsekkaa tää thumbnaili
                item.thumbnail
                  ? 'http://localhost:3002/uploads/' + item.thumbnail
                  : (item.screenshots && item.screenshots[1]) || undefined
              }
              alt={item.title}
            />

            <div className="flex flex-col gap-2 p-4">
              <div className="font-bold">
                <h3 className="text-[1.2em]">{item.title}</h3>
              </div>
              <div>{item.description}</div>
              {/* <div>{new Date(item.created_at).toLocaleString('fi-FI')}</div> */}

              <div className="flex items-center gap-2">
                <CommentCount item={item} />
                <Ratings item={item} />
                <MediasTags media_id={item.media_id} />
              </div>

              {/* <div>{'Media owner: ' + item.username}</div> */}

              {/* <Likes item={item} /> */}
            </div>
          </div>
        </Link>
        <Heart item={item} />
        {/* onko user kirjautunu näyttää kaikki
         ja onko user id sama kun itemin user id -> näytä napit
         tai jos on admin näytä kaikki - || jompi kumpi true*/}
        {((user && user.user_id === item.user_id) ||
          user?.level_name === 'Admin') && (
          <>
            <button
              className="z-10 m-2 cursor-pointer rounded-sm bg-red-500 p-1 text-stone-50"
              onClick={handleDelete}
            >
              Poista
            </button>
            {/* <button
              className="z-10 m-2 cursor-pointer rounded-sm bg-indigo-500 p-1 text-stone-50"
              onClick={() => {
                console.log('Modify klivk');
              }}
            >
              Modify
            </button> */}
          </>
        )}
      </div>
    </>
  );
};

export default MediaRow;
