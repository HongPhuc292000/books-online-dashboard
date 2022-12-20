export interface Author {
  _id: string;
  imageUrl: string;
  name: string;
  yearOfBirth: string | null;
  yearPassed: string | null;
  description?: string;
}

export interface AddEditAuthorRequest {
  imageUrl: string;
  name: string;
  yearOfBirth: string | null;
  yearPassed: string | null;
  description?: string;
}
