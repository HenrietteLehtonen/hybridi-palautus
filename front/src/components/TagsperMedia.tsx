import {Tag} from '../types/src/DBTypes';
import {useTag} from '../hooks/apiHooks';
import {useEffect, useState} from 'react';

const MediasTags = ({media_id}: {media_id: number}) => {
  // mitä apihookista käytetään
  const {getTagsByMediaId} = useTag();
  //"alkuarvo"
  const [tags, setTags] = useState<Tag[]>([]);

  const getMediasTag = async () => {
    try {
      const mediaTag = await getTagsByMediaId(media_id);
      // updatee tägit
      setTags(mediaTag);
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  useEffect(() => {
    getMediasTag();
  }, []);

  return (
    <>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag.tag_id}
            className="my-2 rounded-sm bg-emerald-600 p-1 text-sm text-neutral-50"
          >
            {tag.tag_name}
          </span>
        ))}
      </div>
    </>
  );
};

export default MediasTags;
