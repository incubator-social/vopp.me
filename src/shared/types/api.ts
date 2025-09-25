export type ResponseErrorType = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    }
  ];
  error: string;
};
