'use client';

import { Avatar } from '@/src/shared/ui/Avatar';
import styles from './PostLikesBar.module.scss';

type LikeUser = {
  id: number;
  userId: number;
  userName: string;
  avatars: { url: string | null; width: number; height: number }[];
};

type PostLikesResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: LikeUser[];
};

// моковые данные (имитация ответа API)
const mockLikes: PostLikesResponse = {
  pageSize: 12,
  totalCount: 2243,
  notReadCount: 0,
  items: [
    {
      id: 1,
      userId: 101,
      userName: 'Alice',
      avatars: [{ url: null, width: 300, height: 300 }]
    },
    {
      id: 2,
      userId: 102,
      userName: 'Bob',
      avatars: [
        {
          url: '/35bab440-b8d7-4a20-a121-69725792c892-images-1440x1440.webp',
          width: 300,
          height: 300
        }
      ]
    },
    {
      id: 3,
      userId: 103,
      userName: 'Charlie',
      avatars: [
        {
          url: '/a1c1c1a9-fa42-4daf-ada0-b49e0acfccbd-images-1440x1440.webp',
          width: 300,
          height: 300
        }
      ]
    }
  ]
};

type Props = {
  postId?: number;
};

export const PostLikesBar = ({}: Props) => {
  const data = mockLikes; // пока мок
  const users = data.items.slice(0, 3); // максимум 3 аватарки
  const total = data.totalCount;

  if (total === 0) {
    return (
      <div className={styles.likesBar}>
        <span className={styles.total}>No likes yet</span>
      </div>
    );
  }

  return (
    <div className={styles.likesBar}>
      <div className={styles.avatars}>
        {users.map((u, idx) => (
          <div key={u.id} className={styles.avatarWrapper} style={{ zIndex: users.length - idx }}>
            <Avatar src={u.avatars?.[0]?.url ?? null} name={u.userName} size={24} />
          </div>
        ))}
      </div>
      <span className={styles.total}>
        {total.toLocaleString()} <b>{'Like'}</b>
      </span>
    </div>
  );
};
