import {withRouter, Link} from 'react-router-dom'
import * as React from "react";

import {Menu, Icon, Avatar, Dropdown, message} from 'antd';

import './App.css';


class AppHeader extends React.Component {

	state = {
		visible: false
	};

	handleVisibleChange = flag => {
		this.setState({ visible: flag });
	};

	handleActionButtonClick = e => {
		message.info('Click on action button');
		console.log('click action button', e);
	};

	handleActionButtonMenuClick = e => {
		message.info('Click on menu item: ' + e.key);
		console.log('click menu item', e);
	};

	render()	{

		const userMenu = (
			<Menu>
				<Menu.Item disabled={true}>User is logged in</Menu.Item>
				<Menu.Item key="logout"><Icon type="logout"/>Logout</Menu.Item>
			</Menu>
		);

		const actionButtonMenu = (
			<Menu onClick={this.handleActionButtonMenuClick}>
				<Menu.Item key="invoice">
					<Icon type="rocket" />
					New 3G
				</Menu.Item>
				<Menu.Item key="document">
					<Icon type="folder" />
					New 4G
				</Menu.Item>
				<Menu.Item key="data-row">
					<Icon type="hdd" />
					New 5G
				</Menu.Item>
			</Menu>
		);

		return (
			<div className={"header-block"}>
				<div>
					<Dropdown.Button type={"primary"} onClick={this.handleActionButtonClick} overlay={actionButtonMenu}>
						<Icon type="rocket" /> New Product
					</Dropdown.Button>

					<Dropdown
						overlay={userMenu}
						onVisibleChange={this.handleVisibleChange}
						visible={this.state.visible}
					>
						<span className={"user-container"}>
							<Avatar src={null} icon="user" />
							<span className={"username"}>MingLai</span>
						</span>
					</Dropdown>
				</div>
			</div>
		)
	}
}

export default withRouter(AppHeader);