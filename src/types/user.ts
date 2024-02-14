export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "seller" | "superAdmin" | "manager";
  branch?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
