export interface ProductImport {
  productId: string;
  amount: number;
  bookCode: string;
  imageUrl: string;
  name: string;
}

interface IdAndFullnameInfo {
  _id: string;
  fullname: string;
}

export interface ImportBook {
  _id: string;
  orderCode: string;
  createdBy: IdAndFullnameInfo;
  isCancel: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ImportBookDetail {
  _id: string;
  orderCode: string;
  createdBy: IdAndFullnameInfo;
  products: ProductImport[];
  isCancel: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddEditImportBook {
  orderCode: string;
  createdBy?: string;
  products: ProductImport[];
  isCancel?: boolean;
}

export interface UpdateImportBookStatusRequest {
  isCancel: boolean;
}
