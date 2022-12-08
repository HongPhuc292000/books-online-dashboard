export interface Category {
  _id: string;
  type: string;
  name: string;
}

export interface AddNewCategoryRequest {
  type: string;
  name: string;
}
