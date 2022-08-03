import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';
import { TypeObjParams } from '../../interface/list-user/list_user.interface';
var qs = require('querystringify');

export const getListUser = async (params: TypeObjParams) => {
	console.log(params);
	let objParamUrls = qs.stringify(params);
	return await apiClient.get(`/list-users?${objParamUrls}`);
};

export const changeStatusUser = async (uuidParams: string) => {
	return await apiClient.post(`/change-status-user/${uuidParams}`);
};
