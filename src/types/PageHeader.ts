import { RolesPermission } from "./enums";

export interface HeaderNavChangePageI {
  title?: string;
  link: string;
  children?: HeaderNavChangePageI[];
  icon?: React.ReactNode;
  permission?: RolesPermission;
}
