export type CategoryProps = {
  uid: string;
  title: string;
}

export type CategoryContextProps = {
  categories: CategoryProps[];
  addCategory: any;
}

export const initialCategory = { categories: [], addCategory: () => {} }