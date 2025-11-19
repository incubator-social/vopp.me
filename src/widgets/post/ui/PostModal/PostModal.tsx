'use client';

import { Modal } from '@/src/shared/ui/Modal';
import { Carousel } from '@/src/shared/ui/Carousel';
import styles from './PostModal.module.scss';
import { Avatar } from '@/src/shared/ui/Avatar';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useGetPostByIdQuery } from '@/src/entities/post/api/postsApi';
import { PostTime } from '@/src/shared/ui/PostTime/PostTime';
import { PostActions, PostLikesBar } from '@/src/entities/post/ui';
import { DropdownMenu } from '@/src/shared/ui/DropdownMenu';
import { getFollowedUserPostMenuItems, getOwnPostMenuItems } from '../../lib/postMenuItems';
import { useDeletePost } from '@/src/features/post/deletePost/lib/useDeletePost';
import { useState } from 'react';
import { EditPostModal } from '@/src/features/post/editPost/ui/EditPostModal';

type Props = {
  open: boolean;
  setOpenPostModal: (open: boolean) => void;
  postId: number;
};
export const PostModal = ({ open, setOpenPostModal, postId }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: post } = useGetPostByIdQuery(postId);

  const { isAuth, user } = useAuth();
  const { handleDeleteClick, ConfirmModalComponent: DeleteConfirmModal } = useDeletePost(postId, setOpenPostModal);

  const handleUnfollow = async () => {
    console.log('Отписаться от пользователя', post?.ownerId);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const menuItems =
    post?.ownerId === user?.userId
      ? getOwnPostMenuItems({
          onEdit: handleEditClick,
          onDelete: handleDeleteClick
        })
      : getFollowedUserPostMenuItems({
          onUnfollow: handleUnfollow,
          onCopyLink: handleCopyLink
        });

  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpenPostModal}
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

            <div className={styles.content}>
              {post?.description}
              <br />
              {/* Нужно продумывать реализацию комментариев  */}
              Comments will be here
            </div>
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
      <EditPostModal open={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} post={post} />
      {!isEditModalOpen && <DeleteConfirmModal />}
    </>
  );
};
