import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';
var qs = require('querystringify');

export const getListUser = async (params: any) => {
	console.log(params);
	let objParamUrls = qs.stringify(params);
	return await apiClient.get(`/list-users?${objParamUrls}`);
};

export const changeStatusUser = async (uuidParams: string) => {
	return await apiClient.post(`/delete-user/${uuidParams}`);
};
