export enum Steps {
  UploadImage = 'UploadImage',
  Cropping = 'Cropping',
  Filter = 'Filter',
  Description = 'Description'
}

export type ImageData = {
  id: number;
  file: File;
  previewURL: string;
  filters?: object;
};

export type AddPostState = {
  images: ImageData[];
  currentStep: Steps | null;
};
