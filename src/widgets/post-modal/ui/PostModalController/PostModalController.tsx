'use client';

import { useEffect } from 'react';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useGetPostByIdQuery } from '@/src/entities/post/api/postsApi';
import { PostModal } from '@/src/widgets/post-modal/ui/PostModal/PostModal';
import { EditPostModal } from '@/src/features/post/edit-post/ui/EditPostModal';
import { usePostModalQuery } from '@/src/shared/hooks/usePostModalQuery';

export const PostModalController = () => {
  const { user } = useAuth();
  const isAuth = !!user;

  const { postId, isEdit, closePost, openEdit, closeEdit } = usePostModalQuery();

  const shouldCheckEdit = postId !== null && isEdit;
  const { data: postForEdit, isLoading } = useGetPostByIdQuery(postId!, { skip: !shouldCheckEdit });

  const canEdit = isAuth && !!postForEdit && postForEdit.ownerId === user?.userId;

  useEffect(() => {
    if (!shouldCheckEdit) return;
    if (isLoading) return;

    if (!postForEdit || !canEdit) {
      closeEdit();
    }
  }, [shouldCheckEdit, isLoading, postForEdit, canEdit, closeEdit]);

  if (postId === null) return null;

  if (isEdit && isLoading) return null;

  return (
    <>
      {!isEdit && (
        <PostModal
          open
          postId={postId}
          setOpenPostModal={(open) => {
            if (!open) closePost();
          }}
          onEdit={openEdit}
        />
      )}

      {isEdit && canEdit && <EditPostModal open postId={postId} onClose={closeEdit} />}
    </>
  );
};
