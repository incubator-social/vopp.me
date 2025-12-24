import { useAppSelector } from '@/app/lib/hooks';
import { AddPostDescriptionValue } from '@/src/features/add-post/model';
import { PreviewImageAspect } from '@/src/features/add-post/ui/preview-image-aspect/PreviewImageAspect';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { useGetPublicProfileQuery } from '@/src/features/profile/api/profileApi';
import { Avatar } from '@/src/shared/ui/Avatar';
import { Textarea } from '@/src/shared/ui/Textarea/Textarea';
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import styles from './DescriptionForm.module.scss';

export type DescriptionFormPropsType = {
  descriptionText: number;
  errors: FieldErrors<AddPostDescriptionValue>;
  register: UseFormRegister<AddPostDescriptionValue>;
  formHandleSubmit: FormEventHandler<HTMLFormElement>;
};

export const DescriptionForm = ({ errors, register, descriptionText, formHandleSubmit }: DescriptionFormPropsType) => {
  const imagesState = useAppSelector((state) => state.addPost.images);

  const { user } = useAuth();

  const { data } = useGetPublicProfileQuery(user?.userId as number);
  const userName = data?.userName;

  const imageData = imagesState[0]!;

  return (
    <form id={'post-publication-form'} onSubmit={formHandleSubmit}>
      <div className={styles.formContent}>
        <div className={styles.containerImage}>
          {imagesState && <PreviewImageAspect aspect={imageData.crop.aspect} previewUrl={imageData.previewURL} />}
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.userInfo}>
            <Avatar src={data ? data.avatars[0]?.url : null} name={userName} />
            <p>{userName}</p>
          </div>

          <Textarea
            label={'Add publication descriptions'}
            resize={'none'}
            className={styles.textarea}
            labelClassName={styles.labelTextAria}
            maxLength={500}
            {...register('description')}
          />

          <span className={`${styles.captionLength} regular-text-14`}>
            {descriptionText}/{500}
          </span>

          {errors.description && <span>{errors.description.message}</span>}
        </div>
      </div>
    </form>
  );
};
