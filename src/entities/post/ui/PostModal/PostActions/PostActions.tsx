'use client';

import styles from './PostActions.module.scss';
import HeartIcon from '@/src/shared/assets/icons/heart-outline.svg';
import PaperPlaneIcon from '@/src/shared/assets/icons/paper-plane-outline.svg';
import BookmarkIcon from '@/src/shared/assets/icons/bookmark-outline.svg';

type Props = {
  onLike?: () => void;
  onSend?: () => void;
  onSave?: () => void;
};

export const PostActions = ({ onLike, onSend, onSave }: Props) => {
  return (
    <div className={styles.actions}>
      <div className={styles.left}>
        <button className={styles.iconBtn} onClick={onLike}>
          <HeartIcon />
        </button>
        <button className={styles.iconBtn} onClick={onSend}>
          <PaperPlaneIcon />
        </button>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn} onClick={onSave}>
          <BookmarkIcon />
        </button>
      </div>
    </div>
  );
};
