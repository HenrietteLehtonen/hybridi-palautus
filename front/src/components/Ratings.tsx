import {MediaItemWithOwner} from '../types/src/DBTypes';
import {useRating} from '../hooks/apiHooks';
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const Ratings = ({item}: {item: MediaItemWithOwner}) => {
  const {getAverageRating} = useRating();
  const [ratingAverage, setRatingAverage] = useState(0);

  const getAverageRatings = async () => {
    try {
      const rating = await getAverageRating(item.media_id);
      setRatingAverage(rating.average);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  useEffect(() => {
    getAverageRatings();
  }, [item]);

  return (
    <div>
      {<FontAwesomeIcon icon={faStar} className="text-emerald-600" />}{' '}
      {ratingAverage}
    </div>
  );
};

export default Ratings;
