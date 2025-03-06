import type { User } from "@clerk/nextjs/server";

export type ClerkUserName = User["firstName"];

export interface UpdateAccountRequest {
    firstName: string;
    lastName: string;
}
export interface UpdateAccountResponse {
    id: User['id'] | null;
}