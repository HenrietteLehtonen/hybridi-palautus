import {MediaItemWithOwner} from '../types/src/DBTypes';
import SingleView from '../components/SingleView';
import {useState} from 'react';
import MyMedia from '../components/MyMedia';
import {useMedia} from '../hooks/apiHooks';

import {useUserContext} from '../hooks/contextHooks';

const Files = () => {
  const [SelectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {mediaArray} = useMedia();
  const {user} = useUserContext();

  return (
    <>
      {SelectedItem && (
        <>
          <SingleView item={SelectedItem} setSelectedItem={setSelectedItem} />
        </>
      )}
      <h2>Omat reseptit</h2>
      <div className="my-4 flex flex-wrap justify-center gap-8">
        {/* Mäppää vaan omat filut */}
        {mediaArray.map(
          (mediaItem) =>
            user &&
            user.user_id === mediaItem.user_id && (
              <MyMedia
                key={mediaItem.media_id}
                item={mediaItem}
                setSelectedItem={setSelectedItem}
              />
            ),
        )}
      </div>
    </>
  );
};
export default Files;
