import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button, Switch, Modal, Form, Input, Select, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;
export default class Users extends Component {
    state = {
        roleType: 1, //记录选中的roleType值
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            { title: '用户名', dataIndex: 'username', key: 'username' },
            {
                title: '用户状态', dataIndex: 'roleState', key: 'roleState',
                render: (data, el) => {
                    return <Switch defaultChecked={data} disabled={el.default} onChange={(checked) => { this.onhandChange(checked, el) }}></Switch>
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (el) => <p>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={el.default} style={{ marginRight: "5px" }} onClick={() => this.updatecilck(el.id)} />
                    <Button type="danger" shape="circle" icon={<DeleteOutlined />} disabled={el.default} onClick={() => this.delcilck(el.id)} />
                </p>,
            },
        ],
        datalist: [],
        visible: false,
        visibleUpdate: false,
        formdata: null
    }
    componentDidMount() {
        axios.get('http://localhost:8000/users').then(res => {
            console.log(res.data);
            this.setState({
                datalist: res.data
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onClick}>添加用户</Button>
                <Table columns={this.state.columns} dataSource={this.state.datalist} rowKey={el => el.id}></Table>
                {/* 添加用户的对话框 */}
                <Modal
                    title="添加用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <Form
                        ref="addform"
                        layout="vertical"
                        name="form_in_modal"
                    // initialValues={{ modifier: 'public' }} 
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the suername of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the password of collection!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the select of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            //     filterOption={(input, option) =>
                            //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            //     }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
                {/* 更新状态框 */}
                <Modal
                    title="更新用户"
                    visible={this.state.visibleUpdate}
                    onOk={this.handleUpdateOk}
                    onCancel={() => {
                        this.setState({
                            visibleUpdate: false
                        })
                    }}
                >
                    <Form
                        ref="Updateform"
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={this.state.formdata}// 只有第一次有 后面不更新了
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the suername of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the password of collection!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: 'Please input the select of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            //     filterOption={(input, option) =>
                            //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            //     }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }
    onhandChange = (checked, el) => {
        axios.put(`http://localhost:8000/users/${el.id}`, {
            ...el,
            roleState: checked
        })
    }
    // 更新处理函数
    handleUpdateOk = () => {
        this.refs.Updateform.validateFields().then(value => {
            console.log(value, this.state.roleType);
            axios.put(`http://localhost:8000/users/${this.state.formdata.id}`, {
                ...this.state.formdata,
                ...value,
                roleType: this.state.roleType
            }).then(res => {
                console.log(res.data);
                var newlist = this.state.datalist.map(el => {
                    if (el.id === this.state.formdata.id) {
                        return res.data
                    } else {
                        return el
                    }
                })
                this.setState({
                    visibleUpdate: false,
                    datalist: newlist
                })
            })
        })
    }
    updatecilck = (id) => {
        // modal动态创建  直接拿不到refs
        // 1  modal提前创建  然后隐藏  需要的时候在显示
        // 2 设置一个状态 让状态更新 渲染form表单的时候在传入
        // this.setState({
        //     visibleUpdate: true
        // },()=>{

        // })
        // this.refs.Updateform.setFieldsValue({
        //     username: formdata[0].username,
        //     password: formdata[0].password,
        //     roleName: formdata[0].roleName
        // })
        var formdata = this.state.datalist.filter(el => el.id === id)
        // console.log(formdata[0]);
        this.setState({
            formdata: formdata[0],
            visibleUpdate: true,
            roleType: formdata[0].roleType
        })
        this.refs.Updateform && this.refs.Updateform.setFieldsValue({
            username: formdata[0].username,
            password: formdata[0].password,
            roleName: formdata[0].roleName
        })
    }




    // 删除处理
    delcilck = (id) => {
        axios.delete(`http://localhost:8000/users/${id}`).then(res => {
            this.setState({
                datalist: this.state.datalist.filter(el => {
                    return el.id !== id
                })
            })
            message.success('删除成功')
        })
    }
    onClick = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        this.refs.addform.validateFields()
            .then(values => {
                this.refs.addform.resetFields();
                console.log({ ...values, roleType: this.state.roleType, roleState: false });
                axios.post("http://localhost:8000/users", { ...values, roleType: this.state.roleType, roleState: false }).then(res => {
                    console.log(res.data);
                    this.setState({
                        datalist: [...this.state.datalist, res.data],
                        visible: false
                    })

                })
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    }
    onChange = (data) => {
        var arr = ['小编', '管理员', '超级管理员']
        var roleType = arr.indexOf(data) + 1
        this.setState({
            roleType
        })
    }
}
