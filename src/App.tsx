import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Authenticate from './pages/authenticate/Authenticate';
import Register from './pages/register/Register';
import ResetPass from './pages/reset/ResetPass';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Authenticate />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPass />} />

				{/* <Route path="/home" element={<Home />}>
						<Route path="change-password" element={<ChangePassword />} />
						<Route path="control-user" element={<ControlUser />} />
						<Route path="role-user" element={<RoleUser />} />
						<Route path="create-group-user" element={<CreateUserGroup />} />
					</Route> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
