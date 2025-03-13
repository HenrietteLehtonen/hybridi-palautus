import {Like, MediaItemWithOwner} from '../types/src/DBTypes';
import {useEffect, useReducer} from 'react';
import {useLike} from '../hooks/apiHooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

const testi = (
  <span className="fa-layers fa-fw">
    <FontAwesomeIcon icon={faHeart} className="text-emerald-600" />
    <FontAwesomeIcon
      icon={faHeart}
      className="text-neutral-50"
      transform="shrink-5"
    />
  </span>
);
const likedHeart = (
  <FontAwesomeIcon icon={faHeart} className="text-emerald-600" />
);

type LikeState = {
  count: number; // yhteensä
  userLike: Like | null; // käyttäjän tykkäys
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

// alkuarvo
const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

// reducer funktio
// parametrit state, action
const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    // lisätään count arvo
    case 'setLikeCount':
      return {...state, count: action.count ?? 0}; // palautetaan likestaten userliket ja actionin count
    // lisätään tykkäys
    case 'like':
      return {...state, userLike: action.like ?? null};
    //default: return stat
  }
  return state;
};

const Heart = ({item}: {item: MediaItemWithOwner}) => {
  // [mitä palautetaan, state, dispatch] kutsutaan useReduce hook (reducer, alkuarvo)
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);

  // haetaan alkuarvot apiHooks
  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();

  // function to get the user's like and like count:
  // get user like
  const getLikes = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(item.media_id, token);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  // get like count
  const getLikeCount = async () => {
    // get like count and dispatch it to the state API hooks
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (error) {
      console.log('get user like error', (error as Error).message);
    }
  };

  // ajetaan kerran, kun item päivittyy
  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  // funktio handlaamaan tykkäyksiä
  const handleLike = async () => {
    likeDispatch({type: 'like', like: null});

    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      // If user has liked the media, delete the like. Otherwise, post the like.
      if (likeState.userLike) {
        // delete the like and dispatch the new like count to the state.
        // delete apihook käytetään poistamaan
        await deleteLike(likeState.userLike.like_id, token);
        // dispatch the new like COUNT to the state
        // voidaan kutsua myös getLikes() ja getLikeCount()
        likeDispatch({type: 'like', like: null}); // vähennetään tykkäys
        likeDispatch({type: 'setLikeCount', count: likeState.count - 1}); // vähennetään tykkäysarvosta 1
      } else {
        // post the like and dispatch the new like count to the state. Dispatching is already done in the getLikes and getLikeCount functions.
        await postLike(item.media_id, token);
        getLikes();
        getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };
  const token = localStorage.getItem('token');

  return (
    <>
      {token && (
        <div className="absolute top-2 right-5">
          <button className="text-3xl" onClick={handleLike}>
            {likeState.userLike ? likedHeart : testi}
          </button>
        </div>
      )}
    </>
  );
};

export default Heart;
