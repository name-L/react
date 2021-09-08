import React, { Component } from 'react'
import axios from 'axios'
import { Table, Tag } from 'antd';
// import store from '../../redux/stoer';
import { connect } from 'react-redux';
class Right extends Component {
    state = {
        columns: [
            {
                title: '#',
                dataIndex: 'id',
                key: 'id',
                render: el => {
                    return <b>{el}</b>
                }
            },
            {
                title: '权限名称',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '权限等级',
                dataIndex: 'grade',
                key: 'grade',
                render: el => {
                    if (el === 1) {
                        return <Tag color="#2db766">{el}</Tag>
                    } if (el === 2) {
                        return <Tag color="#2db7f5">{el}</Tag>
                    }
                    return <Tag color="#f50">{el}</Tag>

                }
            },
        ],
        datalist: [

        ]
    }
    // actionCreator = () => {
    //     // 返回一个promsie对象
    //     return axios.get("http://localhost:8000/rights").then(res => {
    //         console.log(res.data);
    //         // this.setState({
    //         //     datalist: res.data
    //         // })
    //         return ({
    //             type: "setright",
    //             payload: res.data
    //         })
    //     })
    // }
    componentDidMount() {
        // axios.get("http://localhost:8000/rights").then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         datalist: res.data
        //     })
        // })
        // if (store.getState().rightList.length === 0) {
        //     store.dispatch(this.actionCreator()).then(data=>{
        //         this.setState({
        //             datalist: store.getState().rightList
        //         })
        //     })
        // } else {
        //     this.setState({
        //         datalist: store.getState().rightList
        //     })
        // }

        if (this.props.datalist.length === 0) {
            this.props.actionCreator()
        }
    }


    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.props.datalist}
                pagination={{ pageSize: 6 }}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        datalist: state.rightList
    }
}
const mapDispatchToProps = {
    actionCreator: async () => {
        // 返回一个promsie对象
        const res = await axios.get("http://localhost:8000/rights");
        console.log(res.data);
        return ({
            type: "setright",
            payload: res.data
        });
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Right)
