'use client';

import { Modal } from '../../../../shared/ui/Modal';
import { Carousel } from '../../../../shared/ui/Carousel';
import styles from './PostModal.module.scss';
import { Avatar } from '../../../../shared/ui/Avatar';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useDeletePostMutation, useGetPostByIdQuery } from '@/src/entities/post/api/postsApi';
import { PostTime } from '../../../../shared/ui/PostTime/PostTime';
import { PostActions, PostLikesBar } from '@/src/entities/post/ui';
import { DropdownMenu } from '../../../../shared/ui/DropdownMenu';
import { getFollowedUserPostMenuItems, getOwnPostMenuItems } from './postMenuItems';
import { useState } from 'react';
import { ConfirmModal } from '@/src/shared/ui/ConfirmModal';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError } from '@/app/store/appSlice';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  postId: number;
};
export const PostModal = ({ open, setOpen, postId }: Props) => {
  const { isAuth, user } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { data: post } = useGetPostByIdQuery(postId);

  const handleEdit = () => {
    console.log('Редактировать пост', postId);
  };

  const handleDelete = () => {
    setConfirmOpen(true);
  };
  const onConfirmDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      dispatch(
        setAppError({
          // нужно доработать Alert, не правильные имена, запутанность
          type: 'success',
          message: 'The post has been successfully deleted.'
        })
      );
      setConfirmOpen(false);
      setOpen(false);
      router.push(`/profile/${user?.userId}`);
    } catch {
      dispatch(
        setAppError({
          type: 'error',
          message: 'Failed to delete post'
        })
      );
      setConfirmOpen(false);
    }
  };

  const onCancelDelete = () => setConfirmOpen(false);

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
    <>
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
      <ConfirmModal
        open={confirmOpen}
        title="Delete post?"
        message="Are you sure you want to delete this post?
        "
        confirmText="Yes"
        cancelText="No"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
        loading={isDeleting}
      />
    </>
  );
};
