import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	BellOutlined,
	DownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { userLogout } from '../../service/auth/AuthService';
import { configApp } from '../../config/config';
import { deleteAccessToken, deleteUserAndPasswordLocal } from '../../helper/tokenHelper';

const { Header, Content, Footer, Sider } = Layout;
import './Home.scss';

export default function Home() {
	const uuid = require('react-uuid');
	type MenuItem = Required<MenuProps>['items'][number];
	const { Header, Sider, Content } = Layout;
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
		getItem('DANH SÁCH NGƯỜI DÙNG', 'sub1', <DesktopOutlined />, [
			getItem('Tài khoản người dùng', '/home/list-user'),
			getItem('Nhóm người dùng', '/home/role-user'),
		]),

		getItem('QUẢN LÝ DỮ LIỆU NGUỒN', 'sub2', <FileOutlined />, [
			// getItem('Option 5', '5'),
			// getItem('Option 6', '6'),
			// getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
		]),

		getItem('QUẢN LÝ MÁY MÓC THIẾT BỊ', 'sub3', <PieChartOutlined />, [
			// getItem('Option 9', '9'),
			// getItem('Option 10', '10'),
			// getItem('Option 11', '11'),
			// getItem('Option 12', '12'),
		]),
		getItem('QUẢN LÝ NGHIỆP VỤ', 'sub4', <TeamOutlined />, [
			// getItem('Option 9', '9'),
			// getItem('Option 10', '10'),
			// getItem('Option 11', '11'),
			// getItem('Option 12', '12'),
		]),
	];

	const handleLogout = () => {
		const accessToken = localStorage.getItem(configApp.tokenKey);
		console.log(accessToken);
		userLogout(accessToken)
			.then(res => {
				console.log(res);
				message.success(res.data.message);
				// deleteUserAndPasswordLocal();
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
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
				<div className="logo h-[64px] text-white flex items-center ml-[20px]">
					{/* <UserOutlined className="mr-[20px]" />
					<p className="mb-0">WEB ADMIN</p> */}
				</div>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClick} />
			</Sider>
			<Layout className="site-layout">
				{/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
				<Header className="header flex items-center w-full justify-between">
					<div className="flex items-center text-white ">
						<UserOutlined
							onClick={() => {
								navigate('/home');
							}}
							className="mr-[20px]"
						/>
						<p className="text-white mb-0 title">WEB ADMIN</p>
					</div>
					<div className="flex items-center text-white mr-[20px] ">
						<BellOutlined className=" mr-[20px]" />
						<div className="relative button-down p-[20px] flex justify-center items-center">
							<DownOutlined className="text-white" />
							<ul className="list text-white bg-white absolute w-[85px] top-[50px] left-[-45px]">
								<li
									className="text-[black] text-center h-[50px] leading-10 list_item"
									onClick={handleChangePass}
								>
									Đổi mật khẩu
								</li>
								<li
									className=" text-[black] text-center h-[50px] leading-10 list_item"
									onClick={handleLogout}
								>
									Đăng xuất
								</li>
							</ul>
						</div>
					</div>
				</Header>
				<Content style={{ margin: '0 16px' }}>
					{/* <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						Bill is a cat.
					</div> */}
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center' }}></Footer>
			</Layout>
		</Layout>
	);
}
