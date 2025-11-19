import { useCallback, useEffect, useState } from 'react';
import type { Post } from '@/src/entities/post/model/posts.schemas';
import { useConfirmModal } from '@/src/shared/hooks/useConfirmModal';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { useUpdatePostByIdMutation } from '@/src/entities/post/api/postsApi';

export const useEditPost = (post: Post | undefined, setIsEditModalOpen: (v: boolean) => void) => {
  const dispatch = useAppDispatch();
  const [editedDescription, setEditedDescription] = useState('');

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostByIdMutation();
  const { openConfirm, ConfirmModalComponent } = useConfirmModal();

  useEffect(() => {
    if (!post) return;
    setEditedDescription(post.description ?? '');
  }, [post]);

  const handleSaveChanges = useCallback(async () => {
    if (!post) return;
    const trimmed = editedDescription.trim();
    if (!trimmed) return;

    try {
      await updatePost({
        postId: post.id,
        data: { description: trimmed }
      }).unwrap();

      // dispatch(
      //   setAppError({
      //     type: 'success',
      //     message: 'The post has been edited'
      //   })
      // );
      // заменить на
      // alert.success('The post has been edited');

      setIsEditModalOpen(false);
    } catch (e) {
      // доп. обработка если необходимо будет
    }
  }, [editedDescription, post, updatePost, dispatch]);

  const handleCancelEdit = useCallback(
    (onDiscard?: () => void) => {
      const original = post?.description ?? '';
      const hasChanges = original !== editedDescription.trim();

      // если ничего не меняли — просто выходим
      if (!hasChanges) {
        setIsEditModalOpen(false);
        setEditedDescription(original);
        onDiscard?.();
        return;
      }

      // есть изменения — показываем confirm
      openConfirm({
        title: 'Discard changes?',
        message: 'Do you really want to close the edition of the publication? If you close changes won’t be saved.',
        confirmText: 'Yes',
        cancelText: 'No',
        onConfirm: () => {
          setIsEditModalOpen(false);
          setEditedDescription(original);
          onDiscard?.();
        }
      });
    },
    [setIsEditModalOpen, editedDescription, post, openConfirm]
  );

  return {
    editedDescription,
    isUpdating,
    setEditedDescription,
    handleCancelEdit,
    handleSaveChanges,
    ConfirmModalComponent
  };
};
