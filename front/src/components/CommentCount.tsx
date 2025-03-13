import {MediaItemWithOwner} from '../types/src/DBTypes';
import {useEffect, useState} from 'react';
import {useComment} from '../hooks/apiHooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';

const commentIcon = (
  <FontAwesomeIcon icon={faComment} className="text-emerald-600" />
);

const CommentCount = ({item}: {item: MediaItemWithOwner}) => {
  const {getCommentCountByMediaId} = useComment();
  const [commentCount, setCommentCount] = useState(0);

  //haetaan kommenttien määrä
  const getCommentCount = async () => {
    try {
      const count = await getCommentCountByMediaId(item.media_id);
      setCommentCount(count.count);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCommentCount();
  }, [item]);

  return (
    <>
      <div>
        {commentIcon} {commentCount}
      </div>
    </>
  );
};

export default CommentCount;
