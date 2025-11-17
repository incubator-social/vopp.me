'use client';

import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './EditContent.module.scss';

type Props = {
  editedDescription: string;
  setEditedDescription: (value: string) => void;
  isUpdating: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export const EditPostContent = ({ editedDescription, setEditedDescription, isUpdating, onCancel, onSave }: Props) => {
  return (
    <>
      <Textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
      <div className={styles.buttonsEditing}>
        <Button
          variant="buttonOutline"
          disabled={isUpdating || !editedDescription.trim()}
          onClick={onCancel}
          size={{ width: 'min-content' }}
        >
          Cancel
        </Button>
        <Button
          variant="buttonPrimary"
          disabled={isUpdating || !editedDescription.trim()}
          onClick={onSave}
          size={{ width: 'min-content' }}
        >
          {isUpdating ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>
    </>
  );
};
