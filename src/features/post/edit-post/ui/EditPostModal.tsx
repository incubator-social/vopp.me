'use client';

import { Modal } from '@/src/shared/ui/Modal';
import { useEditPost } from '@/src/features/post/edit-post/lib/useEditPost';
import styles from './EditPostModal.module.scss';
import { Carousel } from '@/src/shared/ui/Carousel';
import { Avatar } from '@/src/shared/ui/Avatar';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import { Button } from '@/src/shared/ui/Button';
import { useGetPostByIdQuery } from '@/src/entities/post/api/postsApi';
import { useMemo } from 'react';

type Props = {
  postId: number;
  open: boolean;
  onClose: (v: boolean) => void;
};

const MAX_LEN = 500;

export const EditPostModal = ({ postId, open, onClose }: Props) => {
  const { data: post } = useGetPostByIdQuery(postId);
  const images = useMemo(() => post?.images ?? [], [post?.images]);
  const {
    editedDescription,
    isUpdating,
    setEditedDescription,
    handleCancelEdit,
    handleSaveChanges,
    ConfirmModalComponent: EditPostConfirmModal
  } = useEditPost({
    post,
    setIsEditModalOpen: onClose
  });

  const handleModalOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleCancelEdit();
    }
  };

  const handleDescriptionChange = (value: string) => {
    setEditedDescription(value.length > MAX_LEN ? value.slice(0, MAX_LEN) : value);
  };

  return (
    <>
      <Modal
        open={open}
        onOpenChange={handleModalOpenChange}
        size="xl"
        closeButtonPosition="inside"
        noPadding
        closeOnOverlayClick
        closeOnEsc
        title="EditPost"
      >
        <div className={styles.container}>
          <div className={styles.carouselWrapper}>
            <Carousel images={images} variant="large" />
          </div>
          <div className={styles.infoSection}>
            <div className={styles.header}>
              <div className={styles.userBlock}>
                <Avatar src={post?.avatarOwner} name={post?.userName} size={36} />
                <span className={styles.username}>{post?.userName}</span>
              </div>
            </div>
            <div className={styles.wrapperEditing}>
              <div className={styles.textareaWrapper}>
                <Textarea
                  className={styles.textarea}
                  labelClassName={styles.labelTextAria}
                  label={'Add publication descriptions'}
                  value={editedDescription}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  maxLength={MAX_LEN}
                />
                <span className={`${styles.captionLength} regular-text-14`}>
                  {editedDescription.length}/{MAX_LEN}
                </span>
              </div>
              <div className={styles.buttonsEditing}>
                <Button
                  variant="buttonOutline"
                  disabled={isUpdating || !editedDescription.trim()}
                  onClick={handleCancelEdit}
                  size={{ width: 'min-content' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="buttonPrimary"
                  disabled={isUpdating || !editedDescription.trim()}
                  onClick={handleSaveChanges}
                  size={{ width: 'min-content' }}
                >
                  {isUpdating ? 'Saving…' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <EditPostConfirmModal />
    </>
  );
};
