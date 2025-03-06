"use server";

import { UpdateAccountRequest, UpdateAccountResponse } from "@/types/user";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const updateAccount = async ({ firstName, lastName }: UpdateAccountRequest): Promise<UpdateAccountResponse> => {
    try {
        const { userId } = await auth()
        if (!userId) throw new Error("No user found")
        const client = await clerkClient()
        const user = await client.users.updateUser(userId, { firstName, lastName })
        return { id: user.id };
    } catch (error) {
        console.error("Error updating admin", error);
        return { id: null };
    }
};
