import React, { Component } from 'react'
import { Table, Button } from 'antd'
import { EditOutlined, DeleteOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import Axios from 'axios';
export default class List extends Component {
    state = {
        datalist: [],
        columns: [
            { title: '文章标题', dataIndex: 'title', key: 'title' },
            { title: '文章作者', dataIndex: 'author', key: 'author' },
            {
                title: '文章类别', dataIndex: 'category', key: 'category',
                render: (el) => {
                    return <div>{el.join('/')}</div>
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (el) => <p>
                    <Button type="primary" shape="circle" icon={<ConsoleSqlOutlined />} onClick={() => this.pivueclick(el.id)} />
                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => this.addclick(el.id)} />
                    <Button type="danger" shape="circle" icon={<DeleteOutlined />} onClick={() => this.delccclick(el.id)} />
                </p>,
            },
        ],
    }
    componentDidMount() {
        var username = JSON.parse(localStorage.getItem("users")).username
        Axios.get(`http://localhost:8000/articles?author=${username}`).then(res => {
            this.setState({
                datalist: res.data
            })  
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onClick}>添加文章</Button>
                <Table columns={this.state.columns} dataSource={this.state.datalist} rowKey={el => el.id}></Table>
            </div>
        )
    }
    onClick = () => {
        //  跳转到create路由
        this.props.history.push('/article-manage/create')
    }
    pivueclick = (id) => {
        this.props.history.push(`/article-manage/preview/${id}`)
    }
    delccclick = (id) => {
        Axios.delete(`http://localhost:8000/articles/${id}`).then(res => {
            console.log(res.data);
            // Axios.get(`http://localhost:8000/articles`).then(res => {
            //     this.setState({
            //         datalist: res.data
            //     }) 
            // })
            this.setState({
                datalist: this.state.datalist.filter(el => el.id !== id)
            })
        })
    }
    addclick = (id) => {
        this.props.history.push(`/article-manage/update/${id}`)
    }
}
