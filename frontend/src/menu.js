import {withRouter, Link} from 'react-router-dom'
import * as React from "react";

import {Menu, Icon, Layout } from 'antd';

const {Sider} = Layout;


class AppMenu extends React.Component {
	state = {
		collapsed: false
	};

	onCollapse = collapsed => {
		this.setState({collapsed});
	};

	render()	{
		return (
			<Sider
				collapsible
				breakpoint="lg"
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
				theme="light"
			>
				<div className="logo"><span className="accent">App</span>Logo</div>
				<Menu theme="light" defaultSelectedKeys={[]} mode="inline">
					<Menu.Item key="1">
						<Icon type="desktop"/>
						<span>Home</span>
						<Link to="/">
						</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="table"/>
						<span>Products</span>
						<Link to="/list">
						</Link>
					</Menu.Item>
					
				</Menu>
			</Sider>
		)
	}
}

export default withRouter(AppMenu);