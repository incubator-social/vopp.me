'use client';

import { formatRelativeTime } from '../../lib/utils/formatRelativeTime';
import styles from './PostTime.module.scss';

type Props = {
  date?: string;
  className?: string;
};

export const PostTime = ({ date, className }: Props) => {
  if (!date) return null;

  return (
    <div>
      <p className={`${styles.time} ${className ?? ''}`}>{formatRelativeTime(date)}</p>
    </div>
  );
};
