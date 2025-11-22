'use client';

import { Modal } from '@/src/shared/ui/Modal';
import { useEditPost } from '@/src/features/post/editPost/lib/useEditPost';
import styles from './EditPostModal.module.scss';
import { Carousel } from '@/src/shared/ui/Carousel';
import { Post } from '@/src/entities/post/model/posts.schemas';
import { Avatar } from '@/src/shared/ui/Avatar';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import { Button } from '@/src/shared/ui/Button';

type Props = {
  post: Post | undefined;
  open: boolean;
  setOpen: (v: boolean) => void;
  setOpenPostModal: (v: boolean) => void;
};

export const EditPostModal = ({ post, open, setOpen, setOpenPostModal }: Props) => {
  const {
    editedDescription,
    isUpdating,
    setEditedDescription,
    handleCancelEdit,
    handleSaveChanges,
    ConfirmModalComponent: EditConfirmModal
  } = useEditPost({
    post,
    setIsEditModalOpen: setOpen,
    setOpenPostModal
  });

  const handleModalOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true);
      return;
    }
    handleCancelEdit();
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
            <Carousel images={post?.images ?? []} variant="large" />
          </div>
          <div className={styles.infoSection}>
            <div className={styles.header}>
              <div className={styles.userBlock}>
                <Avatar src={post?.avatarOwner} name={post?.userName} size={36} />
                <span className={styles.username}>{post?.userName}</span>
              </div>
            </div>
            <div className={styles.wrapperEditing}>
              <Textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
              {/* заменить textarea на переиспользуемый компонент */}

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
      <EditConfirmModal />
    </>
  );
};
