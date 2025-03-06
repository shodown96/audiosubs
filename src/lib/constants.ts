import { File, LayoutDashboard } from "lucide-react";

export enum STATES {
    UPLOADING = "Uploading your media file...",
    TRANSCRIBING = "Transcribing the media to text...",
    GENERATING = "Generating subtitles..."
}

export enum PATHS {
    SIGN_IN = "/sign-in",
    SIGN_UP = "/sign-up",
    SSO_CALLBACK = "/sso-callback",
    NEW_SUBTITLE = "/subtitles/new",
    SUBTITLES = "/subtitles",
    CHANGE_PASSWORD = "/change-password",
    PROFILE = "/profile",
    DASHBOARD = "/dashboard"
}

export const APP_NAME = "MediaSubs"

export const DASHBOARD_ROUTES = [
    { name: "Dashboard", path: PATHS.DASHBOARD, icon: LayoutDashboard },
    { name: "Subtitles", path: PATHS.SUBTITLES, icon: File },
]

export const ERROR_MESSAGES = {
    BadRequestError: "Bad Request Error",
    AccountAlreadyCreated: "You already have an account with us.",
    AlreadySignedIn: "You're already signed in.",
    AuthenticationError: "You're not signed in.",
    EmailAddressTaken: "The provided email address is taken. Please try another.",
    ExpiredCode: "The code you provided has expired.",
    InternalServerError: "Internal Server Error.",
    InvalidCode: "The code you provided is invalid.",
    InvalidCredentials: "Invalid Credentials Provided.",
    NoPasswordSet: "This user does not have a password set for their account.",
    PasswordNotSet: "Your password was not set before.",
    RequiredDetails: "Please Fill in Required Details!",
    UnexpectedError: "Unable to process request, please try again later.",
    UserAlreadyExists: "A user registered with this email already exists.",
    PasswordBreeched: "Password has been found in an online data breach. For account safety, please use a different password.",
    PasswordLength: "Passwords must be 8 characters or more.",
};

export const VALIDATION_MESSAGES = {
    CodeRequired: "Verification code is required.",
    EmailInvalid: "Please enter a valid email.",
    EmailRequired: "Email is required.",
    FirstNameRequired: "First name is required.",
    LastNameRequired: "Last name is required.",
    PasswordMismatch: "Passwords must match!",
    PasswordRequired: "Password is required.",
    Required: "{} is required.",
    SingleWordFormat: "Your {} should be one-worded without spaces",
    PasswordFormat: "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long",
};

export const MESSAGES = {
    PasswordChangedSuccessfully: "A password reset code was sent to your email.",
    PasswordResetCodeSent: "A password reset code was sent to your email.",
    RegistrationCodeSent: "A confirmation code was sent to your email.",
    ResetPasswordSuccessfully:
        "Your password has been reset successfully and you've been signed in. You can sign in using your new password now.",
    Success: "Success.",
    SuccessfulContact: "Thanks for reaching out, I have received your message and I'll get back to you.",
    UnexpectedError: "Unable to process request, please try again later."
};

export const PLACEHOLDERS = {
    EMAIL: "name@mail.com",
    NAME: "Enter Name",
    FIRST_NAME: "Enter First Name",
    LAST_NAME: "Enter Last Name",
    NEW_PASSWORD: "Enter New Password",
    PASSWORD: "Enter Password",
    SURNAME: "Surname",
};

export const originURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`

export const DEFAULT_PAGE_SIZE = 25