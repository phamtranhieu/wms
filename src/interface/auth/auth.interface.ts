export interface AuthInterface {
	email: string;
	password: string;
}

export interface ParamFieldItems {
	index: number;
	name: number;
}

export interface TypeUser {
	accessToken: string;
	employeeId: null | string;
	employeeName: null | string;
	expiredTime: number;
	isAdmin: boolean;
	refreshExpiredTime: number;
	refreshToken: string;
	tokenType: string;
	userGroupId: string;
	userId: string;
	userName: string;
}
export interface TypeDataSliderChild {
	id: number;
	titleChild: string;
	link: string;
}
export interface TypeDataSlider {
	id: number;
	title: number;
	dataChild: [];
}

export interface TypeChangePassword {
	oldPassword: string;
	password: string;
}
