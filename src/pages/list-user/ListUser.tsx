import { Space, Table, Tag, Pagination, Input, Switch, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, useRef } from 'react';
import { getListUser, changeStatusUser } from '../../service/user/UserService';
import type { PaginationProps } from 'antd';
import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	BellOutlined,
	DownOutlined,
} from '@ant-design/icons';
import { dataActive } from './dataOptionActive';
import { useSearchParams } from 'react-router-dom';

interface DataType {
	name: string;
	phone: string;
	email: string;
	role: string;
	// active: number;
	uuid: string;
	status: any;
}
const { Option } = Select;

// type IDataUser = {
// 	status: any;
// };

export default function ListUser() {
	const typingTimeoutRef = useRef(null);
	const { Search } = Input;
	const [filterSearch, setFilterSearch] = useState<string>('');
	const [numberActive, setNumberActive] = useState();
	const [numberPage, setNumberPage] = useState(1);
	const [numberLimit, setNumberLimit] = useState(10);
	const [lengtDataUser, setLengthDataUser] = useState<number>(0);
	const [dataUser, setDataUser] = useState<any>([]);
	const [searchParams, setSearchParams] = useSearchParams({
		search: '',
		page: '',
		limit: '',
		active: '',
	});
	console.log(dataUser);
	const [objParams, setObjParams] = useState({
		search: '',
		page: 1,
		limit: 10,
		active: '',
	});
	console.log(dataUser);
	useEffect(() => {
		getListUser(objParams)
			.then((res: any) => {
				console.log(res);
				setLengthDataUser(res.data.results.total);
				setDataUser(res.data.results.data);
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, [objParams]);
	const columns: ColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Role',
			key: 'role',
			dataIndex: 'role',
		},
		{
			title: 'Uuid',
			key: 'uuid',
			dataIndex: 'uuid',
		},
		// {
		// 	title: 'Active',
		// 	dataIndex: 'active',
		// 	key: 'active',
		// 	render: (_, record) => (
		// 		<Space size="middle">
		// 			<Switch
		// 				checked={record.active === 1}
		// 				onClick={() => {
		// 					// handleSwitch(record.uuid);
		// 				}}
		// 			/>
		// 		</Space>
		// 	),
		// },
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			// render: (_, record) => (
			// 	<Space size="middle">
			// 		<Switch
			// 			checked={record.status == 1}
			// 			onChange={() => {
			// 				handleSwitchStatus(record.uuid);
			// 			}}
			// 		/>
			// 	</Space>
			// ),
		},
	];

	const data: any = dataUser?.map((item: any, index: number) => {
		return {
			name: item.name,
			phone: item.phone,
			email: item.email,
			role: item.role,
			// active: item.active,
			uuid: item.uuid,
			status: (
				<Switch
					checked={item.status == 1 ? true : false}
					onChange={() => {
						handleSwitchStatus(item.uuid);
					}}
				/>
			),
		};
	});

	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
		setNumberLimit(pageSize);
		setNumberPage(current);
		setObjParams({
			...objParams,
			page: current,
			limit: pageSize,
		});
		setSearchParams({
			...searchParams,
			search: filterSearch,
			page: current.toString(),
			limit: pageSize.toString(),
			active: numberActive,
		});
	};

	const handleChange = (e: any) => {
		setFilterSearch(e.target.value);
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		} else {
			setTimeout(() => {
				setObjParams({
					...objParams,
					search: e.target.value,
				});
				setSearchParams({
					...searchParams,
					search: e.target.value,
					page: `${numberPage}`,
					limit: `${numberLimit}`,
					active: numberActive,
				});
			}, 300);
		}
	};

	const handleChangeSelect = (e: any) => {
		setNumberActive(e);
		setObjParams({
			...objParams,
			active: e,
		});
		setSearchParams({
			...searchParams,
			search: filterSearch,
			page: `${numberPage}`,
			limit: `${numberLimit}`,
			active: e,
		});
	};

	const handleSwitchStatus = (paramsUuid: string) => {
		dataUser.find((item: any, index: number) => {
			if (item.uuid == paramsUuid) {
				{
					item.status == 1 ? (dataUser[index].status = 0) : (dataUser[index].status = 1);
				}
				console.log(item);
			}
		});
		// changeStatusUser(paramsUuid)
		// 	.then(res => {
		// 		console.log(res);
		// 		message.success(res.data.message);
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 		message.success(err.data.message);
		// 	});
	};

	return (
		<div className="mt-[20px]">
			<h1>DANH SÁCH TÀI KHOẢN NGƯỜI DÙNG</h1>
			<div className="flex items-center">
				<div className="w-[500px] my-3 mr-3">
					<p className="font-semibold">Tìm theo tên người dùng</p>
					<Search placeholder="Tìm người dùng" onChange={handleChange} />
				</div>
				<div>
					<p className="font-semibold">Trạng thái hoạt động</p>
					<Select className="w-[150px]" defaultValue={dataActive[2].value} onChange={handleChangeSelect}>
						{dataActive.map((item: any, index: number) => {
							return (
								<>
									<Option value={item.value}>{item.title}</Option>
								</>
							);
						})}
					</Select>
				</div>
			</div>
			<Table columns={columns} dataSource={data} pagination={false} />
			<div className="flex justify-end mt-3">
				<Pagination
					showSizeChanger
					// onShowSizeChange={onShowSizeChange}
					defaultCurrent={1}
					total={lengtDataUser}
					onChange={onShowSizeChange}
				/>
			</div>
		</div>
	);
}
