import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

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
		getItem('QUẢN LÝ TÀI KHOẢN', 'sub1', <DesktopOutlined />, [
			getItem('Tài khoản người dùng', '/home/control-user'),
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
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
				<div className="logo">Web Admin</div>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						Bill is a cat.
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
			</Layout>
		</Layout>
	);
}
