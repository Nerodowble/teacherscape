// backend/schemas/user.schema.ts

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserSchema {
  name: string;
  email: string;
  passwordPlain: string;
}

export interface UpdateUserSchema {
  name?: string;
  email?: string;
  profilePicture?: string;
}
