import { Space, Table, Tag, Pagination, Input, Switch, Select, message, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, useRef } from 'react';
import { getListUser, changeStatusUser } from '../../service/user/UserService';
import type { PaginationProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { dataActive } from './dataOptionActive';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TypeDataUser } from '../../interface/user/user.interface';

import PopupAdd from '../popup-add/PopupAdd';

interface DataType {
	name: string;
	phone: string;
	email: string;
	role: string;
	uuid: string;
	status: any;
}
const { Option } = Select;

export default function ListUser() {
	const navigate = useNavigate();
	const typingTimeoutRef = useRef(null);
	const { Search } = Input;
	const [filterSearch, setFilterSearch] = useState<string>('');
	const [statusActive, setStatusActive] = useState();
	const [numberPage, setNumberPage] = useState(1);
	const [numberLimit, setNumberLimit] = useState(10);
	const [lengtDataUser, setLengthDataUser] = useState<number>(0);
	const [dataUser, setDataUser] = useState<any>([]);

	const [blockDataUser, setBlockDataUser] = useState({ lengthUser: 0, dataUser: [] });

	const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams({
		search: '',
		page: '',
		limit: '',
		status: '',
	});

	const [objParams, setObjParams] = useState({
		search: '',
		page: 1,
		limit: 10,
		status: '',
	});

	useEffect(() => {
		getListUser(objParams)
			.then((res: any) => {
				console.log(res);
				// setLengthDataUser(res.data.results.total);
				// setDataUser(res.data.results.data);
				setBlockDataUser({ lengthUser: res.data.results.total, dataUser: res.data.results.data });
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, [objParams]);
	console.log(blockDataUser);
	const columns: ColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
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
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (_, record) => (
				<Space size="middle">
					<Switch
						checked={record.status === 1}
						onChange={() => {
							handleSwitchStatus(record.uuid);
						}}
					/>
				</Space>
			),
		},
	];

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
			status: statusActive,
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
					status: statusActive,
				});
			}, 300);
		}
	};

	const handleChangeSelect = (e: any) => {
		setStatusActive(e);
		setObjParams({
			...objParams,
			status: e,
		});
		setSearchParams({
			...searchParams,
			search: filterSearch,
			page: `${numberPage}`,
			limit: `${numberLimit}`,
			status: e,
		});
	};

	const handleSwitchStatus = async (paramsUuid: string) => {
		await changeStatusUser(paramsUuid)
			.then(res => {
				console.log(res);
				message.success(res.data.message);
			})
			.catch(err => {
				console.log(err);
			});

		await getListUser(objParams)
			.then((res: any) => {
				console.log(res);
				setBlockDataUser({ lengthUser: res.data.results.total, dataUser: res.data.results.data });
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	const dataUserRender = blockDataUser.dataUser.filter((item: TypeDataUser, index: number) => {
		return item.role === 'user';
	});

	const handleCancel = () => {
		setIsModalVisibleAdd(false);
	};

	const handleAdd = () => {
		setIsModalVisibleAdd(true);
	};
	return (
		<>
			<div className="mt-10">
				<h1>LIST ACCOUNT USER</h1>
				<div className="flex items-center ">
					<div className="w-[500px] my-3 mr-3 md:hidden">
						<Search placeholder="Find user" onChange={handleChange} />
					</div>
					<div className="md:hidden">
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
					<div className="w-[30rem]"></div>
					<div className="md:hidden ml-2">
						<Button
							className=""
							onClick={() => {
								handleAdd();
							}}
						>
							Add User
						</Button>
					</div>
				</div>
				<Table columns={columns} dataSource={dataUserRender} pagination={false} />
				<div className="flex justify-end mt-3">
					<Pagination
						showSizeChanger
						defaultCurrent={1}
						total={blockDataUser.lengthUser}
						onChange={onShowSizeChange}
					/>
				</div>
			</div>
			<PopupAdd ModalVisibleAdd={isModalVisibleAdd} handleCancel={handleCancel} />
		</>
	);
}
