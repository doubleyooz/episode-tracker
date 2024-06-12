export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  tokenVersion?: number;
  activate?: boolean;
}
