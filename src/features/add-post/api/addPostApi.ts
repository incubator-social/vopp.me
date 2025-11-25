import { PostDescriptionRequest, PostDescriptionResponse, PostImagesResponse } from '@/src/features/add-post/api/types';
import { baseApi } from '@/src/shared/api/baseApi';

export const addPostApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postImage: build.mutation<PostImagesResponse, File[]>({
      query: (images) => {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('file[]', image);
        });
        return {
          url: 'posts/image',
          method: 'POST',
          body: images
        };
      }
    }),
    postDescription: build.mutation<PostDescriptionResponse, PostDescriptionRequest>({
      query: ({ description, childrenMetadata: [{ uploadId }] }) => ({
        url: 'posts/image',
        method: 'POST',
        body: { description, childrenMetadata: [{ uploadId }] }
      })
    })
  })
});

export const { usePostImageMutation, usePostDescriptionMutation } = addPostApi;
