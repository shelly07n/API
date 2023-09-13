export class CreateEmployeeDto {
    id: number;
    employeeId: string;
    permissionsId: number;
    departments: string;
    status: string;
    email: string;
    facebookID: string;
    firstName: string;
    lastName: string;
    confirmpassword: string;
    newPassword: string;
    password: string;
    phone: string;
    fullName: string;
    country: string;
    state: string;
    city: string;
    shouldSendWelcomeEmail: boolean;
    emailConfirmationToken: string
    emailConfirmed: boolean;
    verificationCode: number;
    isDeleted: boolean;
    deletedAt: Date;

}

