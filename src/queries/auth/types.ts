// Login Type
export type ILogin = {
	username: string;
	password: string;
};

export type IUpdateUser = {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	roleID?: number;
	isActive: boolean;
};

//Sigup Type
export type ISignup = {
	firstName: string;
	lastName: string;
	type?: string;
	userName: string;
	email: string;
	phone: string;
	password: string;
	signupReferralCode?: string;
};
