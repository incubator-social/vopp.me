'use client';

import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { Button } from '@/src/shared/ui/Button/Button';
import { closeAddPost, openAddPost, setActiveButton } from '@/src/widgets/SidebarWrapper/store';
import { Modal } from '@/src/shared/ui/Modal/Modal';
import styles from './AddPost.module.scss';
import ImageIcon from '@/src/shared/assets/icons/image-outline.svg';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);
  const previousActiveButton = useAppSelector((state) => state.sidebar.previousActiveButton);
  const draftImage = useAppSelector((state) => state.sidebar.image);

  const imageInputRef = useRef(null);

  const handleOpenAddPost = (open: boolean) => {
    if (open) {
      dispatch(openAddPost());
    } else {
      dispatch(closeAddPost());
      dispatch(setActiveButton(previousActiveButton));
    }
  };

  const handleButtonSelectImage = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (image) {
    }
  };

  return (
    <Modal
      open={isOpenAddPost}
      onOpenChange={handleOpenAddPost}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      title={'Add Photo'}
      size={'md'}
    >
      <div className={styles.content}>
        <div className={styles.rectangle}>
          <ImageIcon width={48} height={48} />
        </div>
        <div className={styles.buttonsGroup}>
          <Button size={{ width: '100%' }} className={styles.buttonSelectImage}>
            <input style={{ display: 'none' }} type="file" id="image-input" accept="image/*" />
          </Button>
          {draftImage && (
            <Button variant={'buttonOutline'} size={{ width: '100%' }}>
              Open Draft
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddPost;
