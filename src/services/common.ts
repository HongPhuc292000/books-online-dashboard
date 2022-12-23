import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "firebaseSetup";
import moment from "moment";

const uploadImage = async (file: File, folder: string) => {
  const nameImage = file.name
    .slice(0, file.name.indexOf("."))
    .concat(
      "_",
      moment().valueOf().toString(),
      file.name.slice(file.name.indexOf("."), file.name.length)
    );
  const imageRef = ref(storage, `${folder}/${nameImage}`);
  await uploadBytes(imageRef, file).catch(() => {
    throw new Error("server_error");
  });
  const uploadedUrl = await getDownloadURL(imageRef).then((url) => {
    return url;
  });

  return uploadedUrl;
};

const deleteImage = async (url?: string) => {
  if (url) {
    const oldRef = ref(storage, url);
    deleteObject(oldRef).catch(() => {
      throw new Error("server_error");
    });
  }
};

const commonService = {
  uploadImage,
  deleteImage,
};
export default commonService;
