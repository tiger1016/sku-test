import * as React from "react";
import { Alert, Breadcrumb, Input, Table, Tabs } from 'antd';
import axios from "axios";
import "./sample.css";

const { TabPane } = Tabs;
const { Search } = Input;

class Sample extends React.Component {

	state = {
		data: [],
		pagination: {},
		sorter: {},
		loading: false,
		selectedRowKeys: [],
		searchText: '',
		warning: false
	};

	componentDidMount() {
		this.fetch();
	}

	handleTableChange = (pagination, filters, sorter, extra) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;

		this.setState({
			pagination: pager,
		});
		this.fetch({
			sort: sorter.field,
			order: sorter.order,
		});
	};

	fetch = (params = {}) => {
		this.setState({ loading: true });
		
		axios.get('/fetch', {params}).then(data => {
			const pagination = { ...this.state.pagination };
			pagination.total = data.status === 200 ? data.data.length : 0;

			this.setState({
				loading: false,
				data: data.status === 200 ? data.data : [],
				pagination,
			});
		})
		.catch(error => {
			this.setState({
				warning: true,
				loading: false,
				data: [],
			});
		});

	};

	onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	};

	render() {
		const { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				ellipsis: true,
				sorter: true,
				render: text => <a href={'#'}>{text}</a>,
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
				ellipsis: true,
				sorter: true,
			},
			{
				title: 'City',
				dataIndex: 'city',
				key: 'city',
				ellipsis: true,
				sorter: true,
			},
		];

		return (
			<div>
				{
					this.state.warning &&
					<Alert
						message="Warning"
						description="Server Connection Error!"
						type="error"
						closable
						onClose={this.onClose}
					/>
				}
				<Breadcrumb style={{margin: '16px 0'}}>
					<Breadcrumb.Item>Sample</Breadcrumb.Item>
					<Breadcrumb.Item>Products</Breadcrumb.Item>
				</Breadcrumb>

				<h1>
					Products Table Data
				</h1>

				<div className="card-container">
					<Tabs type="card">
						<TabPane tab="Data table" key="1">
							<Table
								columns={columns}
								rowKey={record => record._key}
								dataSource={this.state.data}
								pagination={this.state.pagination}
								filters={this.state.filters}
								sorter={this.state.sorter}
								loading={this.state.loading}
								onChange={this.handleTableChange}
								rowSelection={rowSelection}
							/>
						</TabPane>
						<TabPane tab="Empty" key="2">
						</TabPane>
					</Tabs>
				</div>

			</div>
		);
	}
}

export default Sample;
