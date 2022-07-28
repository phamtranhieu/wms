import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';

import { authInterface, typeChangePassword } from '../../interface/auth/auth.interface';

export const userLoginAdmin = async (params: authInterface) => {
	return await apiClient.post('/login-admin', params);
};

export const userLogout = async (params: any) => {
	return await apiClient.post('/logout', params);
};

export const userUpdatePassword = async (params: any) => {
	return await apiClient.post('/update-password', params);
};

export const userRegister = async (params: any) => {
	return await apiClient.post('/register', params);
};

export const userResetPassword = async (params: any) => {
	return await apiClient.post('/send-email-forgot-pass', params);
};
