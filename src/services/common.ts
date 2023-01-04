import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "firebaseSetup";
import moment from "moment";
import { DistrictsByProvince, Province, WardsByDistrict } from "types";
import { baseUrl } from "utils/constants";
import { createService } from "./axios";

const baseUrlProvince = "https://provinces.open-api.vn/api/";

const instanceWithToken = createService(baseUrl);
const instanceProvince = createService(baseUrlProvince);

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

const getAllRoles = async (): Promise<string[]> => {
  const response = await instanceWithToken.get(`admin/v1/auth/roles`);
  return response.data;
};

const getAllProvinces = async (): Promise<Province[]> => {
  const response = await instanceProvince.get(`p`);
  return response.data;
};

const getAllDistrictsByProvinceId = async (
  id: number
): Promise<DistrictsByProvince> => {
  const response = await instanceProvince.get(`p/${id}?depth=2`);
  return response.data;
};

const getAllWardsByDistrictId = async (
  id: number
): Promise<WardsByDistrict> => {
  const response = await instanceProvince.get(`d/${id}?depth=2`);
  return response.data;
};

const commonService = {
  uploadImage,
  deleteImage,
  getAllRoles,
  getAllProvinces,
  getAllDistrictsByProvinceId,
  getAllWardsByDistrictId,
};
export default commonService;
