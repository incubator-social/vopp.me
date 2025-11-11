'use client';

import { Modal } from '../../../../shared/ui/Modal';
import { Carousel } from '../../../../shared/ui/Carousel';
import styles from './PostModal.module.scss';
import { Avatar } from '../../../../shared/ui/Avatar';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useGetPostByIdQuery } from '@/src/entities/post/api/postsApi';
import { PostTime } from '../../../../shared/ui/PostTime/PostTime';
import { PostActions, PostLikesBar } from '@/src/entities/post/ui';
import { DropdownMenu } from '../../../../shared/ui/DropdownMenu';
import { getFollowedUserPostMenuItems, getOwnPostMenuItems } from './postMenuItems';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  postId: number;
};
export const PostModal = ({ open, setOpen, postId }: Props) => {
  const { isAuth, user } = useAuth();
  const { data: post } = useGetPostByIdQuery(postId);

  const handleEdit = () => {
    console.log('Редактировать пост', postId);
  };

  const handleDelete = () => {
    console.log('Удалить пост', postId);
  };

  const handleUnfollow = async () => {
    console.log('Отписаться от пользователя', post?.ownerId);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
  };

  const menuItems =
    post?.ownerId === user?.userId
      ? getOwnPostMenuItems({
          onEdit: handleEdit,
          onDelete: handleDelete
        })
      : getFollowedUserPostMenuItems({
          onUnfollow: handleUnfollow,
          onCopyLink: handleCopyLink
        });
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
            {isAuth && <DropdownMenu items={menuItems} />}
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
