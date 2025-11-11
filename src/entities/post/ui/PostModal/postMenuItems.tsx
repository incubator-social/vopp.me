import Edit from '@/src/shared/assets/icons/edit-2-outline.svg';
import Delete from '@/src/shared/assets/icons/trash-outline.svg';
import PersonRemove from '@/src/shared/assets/icons/person-remove-outline.svg';
import CopyLink from '@/src/shared/assets/icons/copy-outline.svg';
import type { ReactNode } from 'react';

export type DropdownMenuItem = {
  label: string;
  onSelect: () => void | Promise<void>;
  icon?: ReactNode;
};

export const getOwnPostMenuItems = ({
  onEdit,
  onDelete
}: {
  onEdit: () => void;
  onDelete: () => void;
}): DropdownMenuItem[] => [
  { label: 'Edit Post', onSelect: onEdit, icon: <Edit /> },
  { label: 'Delete Post', onSelect: onDelete, icon: <Delete /> }
];

export const getFollowedUserPostMenuItems = ({
  onUnfollow,
  onCopyLink
}: {
  onUnfollow: () => void | Promise<void>;
  onCopyLink: () => void;
}): DropdownMenuItem[] => [
  { label: 'Unfollow', onSelect: onUnfollow, icon: <PersonRemove /> },
  { label: 'Copy Link', onSelect: onCopyLink, icon: <CopyLink /> }
];
