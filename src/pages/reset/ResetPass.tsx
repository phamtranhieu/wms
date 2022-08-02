import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { FolderOutlined, LockOutlined } from '@ant-design/icons';
import { errorAuth } from '../../enum/auth/auth.error';
import { userResetPassword } from '../../service/auth/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../../reducer/userReducer';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setUserAndPasswordLocal } from '../../helper/tokenHelper';

export default function ResetPass() {
	const dispatch = useDispatch();
	const [isSpin, setIsSpin] = useState(false);
	const navigate = useNavigate();

	const onFinish = (values: any) => {
		console.log('Success:', values);
		setIsSpin(true);
		userResetPassword(values)
			.then((res: any) => {
				console.log(res);
				setIsSpin(false);
				message.success(res.data.message);
			})
			.catch((err: any) => {
				console.log(err);
				setIsSpin(false);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div>
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
								<h1 className="mb-[20px] text-2xl font-sans text-center">FORGOT PASSWORD</h1>
								<p>Enten your email below to receive your password reset instructions</p>
								<Form.Item
									name="email"
									rules={[
										{
											validator(rule, val) {
												const testRegex =
													/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
		</div>
	);
}
