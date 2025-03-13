import {MediaItemWithOwner} from '../types/src/DBTypes';
import SingleView from '../components/SingleView';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';
import Tags from '../components/Tags';

const Home = () => {
  // single view
  const [SelectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {mediaArray} = useMedia();

  return (
    <>
      {SelectedItem && (
        <>
          <SingleView item={SelectedItem} setSelectedItem={setSelectedItem} />
        </>
      )}
      <h2>Reseptit</h2>
      <Tags />
      <div className="my-4 flex flex-wrap justify-center gap-8">
        {/* Mapataan reseptit */}
        {mediaArray.map((mediaItem) => (
          <MediaRow
            key={mediaItem.media_id}
            item={mediaItem}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
