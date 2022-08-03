import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';

import { AuthInterface } from '../../interface/auth/auth.interface';
import { TypeChangePassword } from '../../interface/change-password/change.interface';

export const userLoginAdmin = async (params: AuthInterface) => {
	return await apiClient.post('/login-admin', params);
};

export const userLogout = async (params: any) => {
	return await apiClient.post('/logout', params);
};

export const userUpdatePassword = async (params: TypeChangePassword) => {
	return await apiClient.post('/update-password', params);
};

export const userRegister = async (params: any) => {
	return await apiClient.post('/register', params);
};

export const userResetPassword = async (params: any) => {
	console.log(params);
	return await apiClient.post('/send-email-forgot-pass', params);
};
