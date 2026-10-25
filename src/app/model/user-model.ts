export interface User {
  auth0Id: string;
  name: string | null;
  level: number;
  currentXp: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserRequest {
  auth0Id?: string;
  name?: string | null;
  level?: number;
  currentXp?: number;
}
