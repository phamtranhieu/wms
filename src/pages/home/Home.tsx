import { DesktopOutlined, UserOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { userLogout } from '../../service/auth/AuthService';
import { configApp } from '../../config/config';
import { deleteAccessToken, deleteUserAndPasswordLocal, getToken } from '../../helper/tokenHelper';

import './Home.scss';

export default function Home() {
	// const navigate = useNavigate();

	type MenuItem = Required<MenuProps>['items'][number];
	const { Header, Sider, Content, Footer } = Layout;
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);

	function getItem(
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: 'group',
	): MenuItem {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem;
	}

	const items: MenuItem[] = [
		getItem('LIST USER', 'sub1', <DesktopOutlined />, [
			// getItem('Tài khoản người dùng', '/home/list-user'),
			// getItem('Nhóm người dùng', '/home/role-user'),
		]),

		// getItem('QUẢN LÝ DỮ LIỆU NGUỒN', 'sub2', <FileOutlined />, []),

		// getItem('QUẢN LÝ MÁY MÓC THIẾT BỊ', 'sub3', <PieChartOutlined />, []),
		// getItem('QUẢN LÝ NGHIỆP VỤ', 'sub4', <TeamOutlined />, []),
	];

	const handleLogout = () => {
		const accessToken = localStorage.getItem(configApp.tokenKey);
		userLogout(accessToken)
			.then(res => {
				console.log(res);
				message.success(res.data.message);
				deleteUserAndPasswordLocal();
				deleteAccessToken();
				navigate('/');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleChangePass = () => {
		navigate('/change-password');
	};

	const onClick: MenuProps['onClick'] = e => {
		console.log('click', e.key);
		navigate(e.key);
	};
	return (
		<Layout className="bg-layout">
			<Sider
				className="siderbar lg:hidden"
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<div className="logo h-10 text-white flex items-center ml-5"></div>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} />
			</Sider>
			<Layout className="site-layout">
				<Header className="header flex items-center w-full justify-between">
					<div className="flex items-center text-white ">
						<UserOutlined
							onClick={() => {
								navigate('/home');
							}}
							className="mr-5"
						/>
						<p className="text-white mb-0 title">WEB ADMIN</p>
					</div>
					<div className="flex items-center text-white mr-5 ">
						<BellOutlined className=" mr-5" />
						<div className="relative button-down p-5 flex justify-center items-center">
							<DownOutlined className="text-white" />
							<ul className="list text-white bg-white absolute w-[7rem] top-[3rem] mb-0 shadow-gray-400 rounded-sm">
								<li
									className=" text-[black] text-center
									 leading-10 list_item shadow-lg"
									onClick={handleLogout}
								>
									Log out
								</li>
								<li
									className="text-[black] text-center
									 leading-10 list_item  shadow-lg"
									onClick={handleChangePass}
								>
									Change Password
								</li>
							</ul>
						</div>
					</div>
				</Header>
				<Content className="mx-4 my-0">
					<Outlet />
				</Content>
				<Footer className="text-center"></Footer>
			</Layout>
		</Layout>
	);
}
