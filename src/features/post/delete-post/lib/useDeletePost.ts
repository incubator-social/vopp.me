import { useDeletePostMutation } from '@/src/entities/post/api/postsApi';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useConfirmModal } from '@/src/shared/hooks/useConfirmModal';
import { useAlert } from '@/src/shared/hooks/useAlert';

export const useDeletePost = (postId: number, setOpenPostModal: (v: boolean) => void) => {
  const [deletePost] = useDeletePostMutation();
  const { user } = useAuth();
  const { openConfirm, ConfirmModalComponent } = useConfirmModal();
  const alert = useAlert();

  const handleDeleteClick = () => {
    openConfirm({
      title: 'Delete post?',
      message: 'Are you sure you want to delete this post?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        setOpenPostModal(false);
        try {
          await deletePost({ postId, userId: user!.userId }).unwrap();
          alert.success('The post has been successfully deleted.');
        } catch {
          alert.error('Failed to delete post');
        }
      }
    });
  };

  return { handleDeleteClick, ConfirmModalComponent };
};
