import { appAction } from './../reducer/appReducer';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import { getAccessToken, getToken, setAccessToken } from '../helper/tokenHelper';
import { configApp } from './config';
import errCode from '../asset/err/err.json';
import store from '../store';
import messageConfig from './messageConfig';
const keyHeaderCheckAuth = 'x-request-fail';
// const dispatch = useDispatch();

const apiClient = axios.create({
	baseURL: `${configApp.hostApi}/${configApp.apiPrefix}/`,
	headers: {
		'content-type': 'application/json',
	},
});

apiClient.interceptors.request.use(function (config: any) {
	const accessToken = getAccessToken();
	if (accessToken) {
		config.headers.Authorization = 'Bearer ' + accessToken;
		// config.headers[keyHeaderCheckAuth] = 0;
	}
	return config;
});
apiClient.interceptors.response.use(
	(res: any) => res,

	async (err: any) => {
		const originalConfig = err?.config;
		// if url api  is 'login' then do not refresh
		if (originalConfig.url === 'login' || !err.response) return Promise.reject(err);
		// avoid endless loop
		if (originalConfig.headers[keyHeaderCheckAuth] > 0) return Promise.reject(err);
		originalConfig.headers[keyHeaderCheckAuth] += 1;
		if (err?.response?.status === 401 && !originalConfig?._retry) {
			originalConfig._retry = true;
			try {
				const response = await apiClient.get('refreshToken');
				const accessToken = response.data.access_token;
				setAccessToken(accessToken);
				return apiClient(originalConfig);
			} catch (_error) {
				return Promise.reject(_error);
			}
		}
		if (err?.response?.status === 400) {
			const errMessage =
				(errCode ?? []).find((x: any) => x.code === err?.response?.data?.code)?.text ??
				messageConfig.ERROR_HAS_OCCURRED;
			store.dispatch(appAction.setErrCode(errMessage));
		}
		return Promise.reject(err);
	},
);
export default apiClient;
