export enum CookiesEnum {
  REFRESHTOKEN = "refresh_token",
  AUTHTOKEN = "auth_token",
}

export enum UpdateAmountEnum {
  INCREASE = "INCREASE",
  REDUCE = "REDUCE",
  INSERT = "FULL",
}

export enum StatusEnum {
  HOT = "HOT",
  NEW = "NEW",
  FULL = "FULL",
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum EnableEnum {
  ENABLE = "ENABLE",
  DISABLE = "DISABLE",
}

// Dialog enums

export enum CommonDialogEnum {
  DELETE = "DELETE",
  ADD = "ADD",
  EDIT = "EDIT",
}

export enum DiscountTypeEnum {
  PERCENT = "PERCENT",
  CASH = "CASH",
}

// constants
export enum CommonKeyEnum {
  SELECT = "SELECT",
}

export enum SettingNavEnums {
  PROFILE = "profile",
  LOGOUT = "logout",
}

export enum OrderStatusesEnum {
  INCART = "INCART",
  ORDERED = "ORDERED",
  DELIVERING = "DELIVERING",
  DONE = "DONE",
  CANCEL = "CANCEL",
  REPAY = "REPAY",
}

export enum PaymentTypeEnum {
  CASH = "CASH",
  ONLINE = "ONLINE",
}

// roles
export enum RolesPermission {
  SUPER_ADMIN = "SUPER_ADMIN",
  SHOW_LIST_MEMBER = "SHOW_LIST_MEMBER",
  ADD_MEMBER = "ADD_MEMBER",
  EDIT_MEMBER = "EDIT_MEMBER",
  DELETE_MEMBER = "DELETE_MEMBER",
  SHOW_LIST_CUSTOMER = "SHOW_LIST_CUSTOMER",
  ADD_CUSTOMER = "ADD_CUSTOMER",
  EDIT_CUSTOMER = "EDIT_CUSTOMER",
  DELETE_CUSTOMER = "DELETE_CUSTOMER",
  SHOW_LIST_AUTHOR = "SHOW_LIST_AUTHOR",
  ADD_AUTHOR = "ADD_AUTHOR",
  EDIT_AUTHOR = "EDIT_AUTHOR",
  DELETE_AUTHOR = "DELETE_AUTHOR",
  ADD_CATEGORY = "ADD_CATEGORY",
  DELETE_CATEGORY = "DELETE_CATEGORY",
  ADD_BOOK = "ADD_BOOK",
  EDIT_BOOK = "EDIT_BOOK",
  DELETE_BOOK = "DELETE_BOOK",
  SHOW_LIST_ORDER = "SHOW_LIST_ORDER",
  ADD_ORDER = "ADD_ORDER",
  EDIT_ORDER = "EDIT_ORDER",
  DELETE_ORDER = "DELETE_ORDER",
  SHOW_LIST_DISCOUNT = "SHOW_LIST_DISCOUNT",
  ADD_DISCOUNT = "ADD_DISCOUNT",
  EDIT_DISCOUNT = "EDIT_DISCOUNT",
  DELETE_DISCOUNT = "DELETE_DISCOUNT",
  SHOW_LIST_IMPORT_BOOK = "SHOW_LIST_IMPORT_BOOK",
  ADD_IMPORT_BOOK = "ADD_IMPORT_BOOK",
  EDIT_IMPORT_BOOK = "EDIT_IMPORT_BOOK",
}
