'use client';

import { Modal } from '../Modal';
import { Carousel } from '../Carousel';
import styles from './PostModal.module.scss';
import { Avatar } from '../Avatar';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useGetPostByIdQuery } from '@/src/entities/post/api/postsApi';
import { PostTime } from '../PostTime/PostTime';
import { PostActions, PostLikesBar } from '@/src/entities/post/ui';
import Edit from '@/src/shared/assets/icons/edit-2-outline.svg';
import Delete from '@/src/shared/assets/icons/trash-outline.svg';
import { DropdownMenu } from '../DropdownMenu';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  postId: number;
};
export const PostModal = ({ open, setOpen, postId }: Props) => {
  const { isAuth } = useAuth();

  const { data: post } = useGetPostByIdQuery(postId);
  const dropdownMenuItems = [
    { label: 'Edit Post', onSelect: () => console.log('Редактировать'), icon: <Edit /> },
    { label: 'Delete Post', onSelect: () => console.log('Удалить'), icon: <Delete /> }
  ];
  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      size="xl"
      closeButtonPosition="outside"
      noPadding
      closeOnOverlayClick
      closeOnEsc
    >
      <div className={styles.container}>
        <div className={styles.carouselWrapper}>
          <Carousel images={post?.images ?? []} variant="large" />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.header}>
            <div className={styles.userBlock}>
              <Avatar src={post?.avatarOwner} name={post?.userName} size={36} />
              <span className={styles.username}>{post?.userName}</span>
            </div>
            {isAuth && <DropdownMenu items={dropdownMenuItems} />}
          </div>
          {/* Нужно продумывать реализацию комментариев  */}
          <div className={styles.content}>Description and Comments go here</div>
          <div className={styles.interactions}>
            {isAuth && (
              // Нужно продумывать реализацию лайков и сохранения, доделать отображение,
              // правильное наведение на иконку, дкмаю дальше будет такая задача
              <PostActions
                onLike={() => console.log('Лайк')}
                onSend={() => console.log('Поделиться')}
                onSave={() => console.log('Сохранить')}
              />
            )}
            <div className={styles.meta}>
              <PostLikesBar postId={postId} />
              <PostTime date={post?.createdAt} />
            </div>
          </div>
        </div>
        {/* Нужно продумывать реализацию добавления комментариев и разграничения доступа */}
      </div>
    </Modal>
  );
};
