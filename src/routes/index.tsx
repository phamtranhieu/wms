import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteProps } from 'react-router';

const PrivateRoute: FC<RouteProps> = props => {
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = localStorage.getItem('userToken');

		if (!accessToken) {
			navigate('/');
		}
	}, []);

	return props.element as React.ReactElement;
};

export default PrivateRoute;
