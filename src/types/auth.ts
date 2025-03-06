export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
export interface ChangePasswordResponse {
  error?: string;
  userId?: string;
}
export interface VerifyPasswordRequest {
  password: string;
}
export interface VerifyPasswordResponse {
  error?: string;
  verified?: boolean;
}

export interface ClerkError {
  errors: {
    code: string;
    message: string;
    longMessage: string;
    meta: {
      paramName: string;
    };
  }[];
}

// {
//   "code": "form_identifier_not_found",
//   "message": "Couldn't find your account.",
//   "longMessage": "Couldn't find your account.",
//   "meta": { "paramName": "identifier" }
// }
