import fileUpload from 'express-fileupload';

export const gettingImages = (req: any, res: any, next: any) => {
  fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
  })

  next()
};