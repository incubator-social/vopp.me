import { useCallback, useEffect, useState } from 'react';
import type { Post } from '@/src/entities/post/model/posts.schemas';
import { useConfirmModal } from '@/src/shared/hooks/useConfirmModal';
import { useUpdatePostByIdMutation } from '@/src/entities/post/api/postsApi';
import { useAlert } from '@/src/shared/hooks/useAlert';

type EditPostProps = {
  post: Post | undefined;
  setIsEditModalOpen: (v: boolean) => void;
  setOpenPostModal: (v: boolean) => void;
};

export const useEditPost = ({ post, setOpenPostModal, setIsEditModalOpen }: EditPostProps) => {
  const alert = useAlert();
  const [editedDescription, setEditedDescription] = useState('');

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostByIdMutation();
  const { openConfirm, ConfirmModalComponent } = useConfirmModal();

  useEffect(() => {
    if (!post) return;
    setEditedDescription(post.description ?? '');
  }, [post]);

  const closeEditor = () => {
    setIsEditModalOpen(false);
    setOpenPostModal(true);
  };

  const handleSaveChanges = useCallback(async () => {
    if (!post) return;
    const trimmed = editedDescription.trim();
    if (!trimmed) return;

    try {
      await updatePost({
        postId: post.id,
        data: { description: trimmed }
      }).unwrap();

      alert.success('The post has been edited');
      closeEditor();
    } catch (e) {
      // доп. обработка если необходимо будет
    }
  }, [editedDescription, post, updatePost, setIsEditModalOpen]);

  const handleCancelEdit = useCallback(() => {
    const original = post?.description ?? '';
    const hasChanges = original !== editedDescription.trim();

    // если ничего не меняли — просто выходим
    if (!hasChanges) {
      closeEditor();
      setEditedDescription(original);
      return;
    }

    // есть изменения — показываем confirm
    openConfirm({
      title: 'Discard changes?',
      message: 'Do you really want to close the edition of the publication? If you close changes won’t be saved.',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => {
        closeEditor();
        setEditedDescription(original);
      }
    });
  }, [setIsEditModalOpen, editedDescription, post, openConfirm]);

  return {
    editedDescription,
    isUpdating,
    setEditedDescription,
    handleCancelEdit,
    handleSaveChanges,
    ConfirmModalComponent
  };
};
