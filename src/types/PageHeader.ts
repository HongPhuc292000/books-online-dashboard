export interface HeaderNavChangePageI {
  title: string;
  link: string;
  children?: HeaderNavChangePageI[];
  icon?: React.ReactNode;
}
