export enum Steps {
  UploadImage = 'UploadImage',
  Cropping = 'Cropping',
  Description = 'Description'
}

export type ImageDataType = {
  id: string;
  file: File;
  previewURL: string;
  filters?: object;
};

export type AddPostStateType = {
  images: ImageDataType[];
  currentStep: Steps | null;
};
