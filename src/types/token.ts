export type Token = {
  token: string;
  expires: string;
};

export type AuthToken = {
  access: Token;
  refresh: Token;
};
