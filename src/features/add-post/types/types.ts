export enum Steps {
  UploadImage = 'UploadImage',
  Cropping = 'Cropping',
  Filter = 'Filter',
  Description = 'Description'
}

export type ImageData = {
  id: string;
  file: File;
  previewURL: string;
  filters?: object;
};

export type AddPostState = {
  images: ImageData[];
  currentStep: Steps | null;
};
