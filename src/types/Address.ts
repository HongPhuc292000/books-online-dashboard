export interface Province {
  code: number;
  codename: string;
  districts: any[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: any[];
}

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

export interface DistrictsByProvince {
  code: number;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface WardsByDistrict {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: Ward[];
}
