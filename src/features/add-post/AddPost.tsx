import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { Button } from '@/src/shared/ui/Button/Button';
import { closeAddPost, openAddPost } from '@/src/widgets/SidebarWrapper/store';
import { Modal } from '@/src/shared/ui/Modal/Modal';
import styles from './AddPost.module.scss';
import ImageIcon from '@/src/shared/assets/icons/image-outline.svg';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const isOpenAddPost = useAppSelector((state) => state.sidebar.isOpenAddPost);

  const handleOpenAddPost = (open: boolean) => {
    open ? dispatch(openAddPost()) : dispatch(closeAddPost());
  };

  return (
    <Modal open={isOpenAddPost} onOpenChange={handleOpenAddPost} closeOnEsc={true} title={'Add Photo'} size={'md'}>
      <div className={styles.content}>
        <div className={styles.rectangle}>
          <ImageIcon width={48} height={48} />
        </div>
        <div className={styles.buttonsGroup}>
          <Button size={{ width: '100%' }}>Select from Computer</Button>
          <Button variant={'buttonOutline'} size={{ width: '100%' }}>
            Open Draft
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddPost;
