import * as React from "react";
import { Breadcrumb } from 'antd';
import axios from "axios";

class Home extends React.Component {
	componentDidMount() {
		axios.get('/');
	}

	render() {
		return (
			<div>
				<Breadcrumb style={{margin: '16px 0'}}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>Sample page</Breadcrumb.Item>
				</Breadcrumb>

				<h1>
					HomePage
				</h1>
				<p>
					Thanks for checkng my test app!
				</p>

			</div>
		);
	}
}

export default Home;
