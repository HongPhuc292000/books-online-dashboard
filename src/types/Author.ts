export interface Author {
  _id: string;
  name: string;
  yearOfBirth: string | null;
  yearPassed: string | null;
  description?: string;
}

export interface AddEditAuthorRequest {
  name: string;
  yearOfBirth: string | null;
  yearPassed: string | null;
  description?: string;
}
