import * as React from 'react';

import styles from './Tag.module.scss';

interface ITagProps {
    label: string;
}

const Tag: React.FunctionComponent<ITagProps> = ({label}) => {
  return <div className={styles.Tag}>
    {label}
  </div>;
};

export default Tag;

export const TagGroup = ({tags}: {tags: string[]}) => {

  return <div className={styles.TagGroup}>
    {tags.map((label, i) => <Tag key={i} label={label} />)}
  </div>
}
