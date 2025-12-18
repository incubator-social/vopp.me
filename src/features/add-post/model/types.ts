export enum Steps {
  UploadImage = 'UploadImage',
  Cropping = 'Cropping',
  Description = 'Description'
}

export type CropImageType = {
  aspect: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageDataType = {
  id: string;
  file: File;
  previewURL: string;
  filters?: object;
  crop?: CropImageType;
};

export type AddPostStateType = {
  images: ImageDataType[];
  currentStep: Steps | null;
};
