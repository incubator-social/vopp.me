import { useDeletePostMutation } from '@/src/entities/post/api/postsApi';
import { useAppDispatch } from '@/app/providers/store/hooks';

import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useConfirmModal } from '@/src/shared/hooks/useConfirmModal';
import { setAppError } from '@/app/store/appSlice';

export const useDeletePost = (postId: number, setOpenPostModal: (v: boolean) => void) => {
  const [deletePost] = useDeletePostMutation();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const { openConfirm, ConfirmModalComponent } = useConfirmModal();

  const handleDeleteClick = () => {
    openConfirm({
      title: 'Delete post?',
      message: 'Are you sure you want to delete this post?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        await deletePost(postId).unwrap();
        dispatch(
          setAppError({
            // нужно доработать Alert, не правильные имена, запутанность
            type: 'success',
            message: 'The post has been successfully deleted.'
          })
        );
        setOpenPostModal(false);
        router.push(`/profile/${user?.userId}`);
      }
    });
  };

  return { handleDeleteClick, ConfirmModalComponent };
};
