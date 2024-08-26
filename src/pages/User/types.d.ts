export interface UserAttributeInterface {
  org: Array<string>;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  secondPassword: any;
  email: string;
  userEnabled: boolean;
  attributes: Partial<UserAttributeInterface>;
}

export type ApiResponseType<ResponseType = null> = {
  data: ResponseType;
  status: number;
  message: string;
};

export type PageResponseType<ResponseType = null> = {
  rows: Array<ResponseType>;
  pageSize: number;
  count: number;
  currentPage: number;
  sortBy: string;
};
