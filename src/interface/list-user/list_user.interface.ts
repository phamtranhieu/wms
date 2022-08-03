export interface DataType {
	name: string;
	phone: string;
	email: string;
	role: string;
	uuid: string;
	status: any;
}

export interface TypeObjParams {
	search: string;
	page: number;
	limit: number;
	status: string;
}

export interface TypeSelect {
	title: string;
	key: number;
	value: any;
}

export interface TypeDataUser {
	active: number;
	apple_access_token: any;
	apple_id: any;
	avatar: any;
	birthday: any;
	created_at: string;
	email: string;
	email_verified_at: any;
	facebook_access_token: any;
	facebook_id: any;
	first_name: any;
	gender: any;
	google_access_token: any;
	google_id: any;
	id: number;
	last_name: any;
	name: string;
	phone: string;
	role: string;
	status: number;
	updated_at: string;
	uuid: string;
}
