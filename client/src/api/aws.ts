import axios from 'axios';

export const putImage = (signedUrl: string, image: File) =>
  axios.put(signedUrl, image);
