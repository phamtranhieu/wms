import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { Routes, Route, BrowserRouter, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Authenticate from './pages/authenticate/Authenticate';
import Register from './pages/register/Register';
import ResetPass from './pages/reset/ResetPass';
import Home from './pages/home/Home';
import ListUser from './pages/list-user/ListUser';
import ChangePassword from './pages/change-password/ChangePassword';
import NotFountPage from './pages/404';

import PrivateRoute from './routes/PrivateRoute';

interface AuthContextType {
	user: any;
	signin: (user: string, callback: VoidFunction) => void;
	signout: (callback: VoidFunction) => void;
}
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Authenticate />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPass />} />
				<Route
					path="/change-password"
					element={
						<PrivateRoute>
							<ChangePassword />
						</PrivateRoute>
					}
				/>
				<Route
					path="/home"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				>
					<Route path="list-user" element={<ListUser />} />
				</Route>
				<Route path="/*" element={<NotFountPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
