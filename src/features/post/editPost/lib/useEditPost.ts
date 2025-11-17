import { useCallback, useEffect, useState } from 'react';
import type { Post } from '@/src/entities/post/model/posts.schemas';
import { useConfirmModal } from '@/src/shared/hooks/useConfirmModal';
import { useAppDispatch } from '@/app/providers/store/hooks';
import { setAppError } from '@/app/store/appSlice';
import { useUpdatePostByIdMutation } from '@/src/entities/post/api/postsApi';

export const useEditPost = (post: Post | undefined, postId: number) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostByIdMutation();
  const { openConfirm, ConfirmModalComponent } = useConfirmModal();

  useEffect(() => {
    if (!post || isEditing) return;
    setEditedDescription(post.description ?? '');
  }, [post, isEditing]);

  const handleEditClick = useCallback(() => {
    if (!post) return;
    setEditedDescription(post.description ?? '');
    setIsEditing(true);
  }, [post]);

  const handleSaveChanges = useCallback(async () => {
    if (!post) return;

    const trimmed = editedDescription.trim();
    if (!trimmed) return;

    try {
      await updatePost({
        postId,
        data: { description: trimmed }
      }).unwrap();

      dispatch(
        setAppError({
          type: 'success',
          message: 'The post has been edited'
        })
      );

      setIsEditing(false);
    } catch (e) {
      // доп. обработка если необходимо будет
    }
  }, [editedDescription, postId, post, updatePost, dispatch]);

  const handleCancelEdit = useCallback(
    (onDiscard?: () => void) => {
      if (!isEditing) return;

      const original = post?.description ?? '';
      const hasChanges = original !== editedDescription.trim();

      // если ничего не меняли — просто выходим
      if (!hasChanges) {
        setIsEditing(false);
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
          setIsEditing(false);
          setEditedDescription(original);
          onDiscard?.();
        }
      });
    },
    [isEditing, editedDescription, post, openConfirm]
  );

  return {
    isEditing,
    editedDescription,
    isUpdating,
    setEditedDescription,
    handleEditClick,
    handleCancelEdit,
    handleSaveChanges,
    ConfirmModalComponent
  };
};
