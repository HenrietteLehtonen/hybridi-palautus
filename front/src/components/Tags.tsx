import {Tag} from '../types/src/DBTypes';
import {useTag} from '../hooks/apiHooks';
import {useEffect, useState} from 'react';

const Tags = () => {
  const {getAllTags} = useTag();
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const getTags = async () => {
    try {
      const tags = await getAllTags();
      // aseta tägit
      setAllTags(tags);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    // useEffect tietokantahaku
    getTags();
  }, []);

  return (
    <>
      <div className="flex">
        {allTags.map((tag) => (
          <span
            key={tag.tag_id}
            className="m-2 rounded-sm bg-orange-400 p-1.5 text-neutral-50"
          >
            {tag.tag_name}
          </span>
        ))}
      </div>
    </>
  );
};

export default Tags;
