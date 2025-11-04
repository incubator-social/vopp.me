export enum Steps {
  UploadImage = 'UploadImage',
  Cropping = 'Cropping',
  Filter = 'Filter',
  Description = 'Description'
}

export type AddPostState = {
  previewURL: string | null;
  currentStep: Steps | null;
};
