"use server";

import { ERROR_MESSAGES } from "@/lib/constants";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/types/auth";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    const { userId } = await auth();
    const client = await clerkClient()
    if (!userId) return { error: ERROR_MESSAGES.AuthenticationError };
    const { verified } = await client.users.verifyPassword({
      password: currentPassword,
      userId,
    });
    if (!verified) {
      return { error: ERROR_MESSAGES.InvalidCredentials };
    }
    const user = await client.users.updateUser(userId, {
      password: newPassword,
    });
    return { userId: user.id };
  } catch (error) {
    console.error("Error to change password", error);
    return { error: "unexpected_error" };
  }
};
