import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { FolderOutlined, LockOutlined } from '@ant-design/icons';
import { errorAuth } from '../../enum/auth/auth.error';
import { userLogin } from '../../service/auth/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../reducer/userReducer';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setUserAndPasswordLocal } from '../../helper/tokenHelper';

import './Authenticate.scss';

export default function Authenticate() {
	const dispatch = useDispatch();
	const [isSpin, setIsSpin] = useState(false);
	const navigate = useNavigate();

	const onFinish = (values: any) => {
		console.log('Success:', values);
		setIsSpin(true);
		userLogin(values)
			.then(res => {
				console.log(res);
				if (res.data.success) {
					dispatch(userAction.setUserLogin(res.data.results));
					message.success(res.data.message);
					setAccessToken(res.data.results.token);
					setIsSpin(false);
					navigate('/home');
				} else {
					message.error(res.data.message);
					setIsSpin(false);
				}
			})
			.catch(err => {
				console.log(err);
				setIsSpin(false);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Spin size="small" spinning={isSpin} delay={1000}>
			<div className="w-full h-[100vh] bg_auth flex items-center">
				<div className="w-[400px]  mx-auto rounded-md p-3">
					<Form
						name="basic"
						labelCol={{ span: 32 }}
						wrapperCol={{ span: 32 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						layout="vertical"
						size="large"
						className="items-center w-full h-full bg-white rounded my-auto"
					>
						<div className="p-5">
							<h1 className="mb-[20px] text-2xl font-sans text-center">LOG IN</h1>
							<Form.Item
								name="email"
								rules={[
									{
										validator(rule, val) {
											const testRegex =
												/^[a-zA-Z0-9.!#$%&???*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
											if (val === undefined || val === null || val === '') {
												return Promise.reject(new Error(errorAuth.EMAIL_NONE));
											} else if (!testRegex.test(val)) {
												return Promise.reject(new Error(errorAuth.EMAIL_FORMAT));
											} else {
												return Promise.resolve();
											}
										},
									},
								]}
							>
								<Input
									prefix={<FolderOutlined className="mr-2" />}
									placeholder="Please enter your email"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{
										validator(rule, val) {
											if (val === undefined || val === null || val === '') {
												return Promise.reject(new Error(errorAuth.PASSWORD_NONE));
											} else if (val.length < 6) {
												return Promise.reject(new Error(errorAuth.PASSWORD_LENGTH));
											} else {
												return Promise.resolve();
											}
										},
									},
								]}
								className="mb-[40px]"
							>
								<Input.Password
									prefix={<LockOutlined className="mr-2" />}
									placeholder="Please enter your password"
								/>
							</Form.Item>
							<p
								className="text-right cursor-pointer"
								onClick={() => {
									navigate('/reset-password');
								}}
							>
								Forgot Password?
							</p>
							<div className="flex justify-center">
								<p className="font-sans font-semibold">Don't have an account? </p>
								<p
									className="font-sans underline ml-1 cursor-pointer"
									onClick={() => {
										navigate('/register');
									}}
								>
									SIGN UP
								</p>
							</div>
							<Form.Item wrapperCol={{ offset: 32, span: 32 }} className="w-full">
								<Button type="primary" htmlType="submit" danger className="w-full rounded-md">
									Submit
								</Button>
							</Form.Item>
						</div>
					</Form>
				</div>
			</div>
		</Spin>
	);
}
