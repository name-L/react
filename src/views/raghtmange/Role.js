import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd';
import axios from 'axios'
// import store from '../../redux/stoer'
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <p>
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} disabled={true} />
                </p>,
            },
        ],
        datalist: []
    }
    // actionCreator = () => {
    //     // middleware 
    //     return (dispatch) => {
    //         axios.get('http://localhost:8000/roles').then(res => {
    //             // console.log(res.data);
    //             dispatch({
    //                 type: "stelele",
    //                 payload: res.data
    //             })
    //             // this.setState({
    //             //     datalist: res.data
    //             // })
    //         })
    //     }
    // }
    componentDidMount() {
        // axios.get('http://localhost:8000/roles').then(res => {
        //     console.log(res.data);
        //     this.setState({
        //         datalist: res.data
        //     })
        // })
        // if (store.getState().roleList.length === 0) {
        //     store.dispatch(this.actionCreator())
        // } else {
        //     // console.log("使用缓存", store.getState().roleList);
        //     this.setState({
        //         datalist: store.getState().roleList
        //     })
        // }
        // this.unscribe = store.subscribe(() => {
        //     this.setState({
        //         datalist: store.getState().roleList
        //     })
        // })
        if (this.props.datalist.length === 0) {
            this.props.actionCreator()
        }
    }
    // componentWillUnmount() {
    //     this.unscribe() // 取消订阅
    // }

    render() {
        return (
            <Table
                columns={this.state.columns}
                expandable={{
                    expandedRowRender: record => {
                        return <div style={{ margin: 0 }}>{record.description}
                            {
                                record.roleRight.map(el => {
                                    return <div key={el.category}>
                                        <Tag color={"#f50"}><h4 style={{ color: "#fff" }}>{el.category}</h4></Tag>
                                        {
                                            el.list.map(item => {
                                                return <Tag color={"pink"} key={item}>
                                                    {item}
                                                </Tag>
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    },
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={this.props.datalist}
                rowKey={el => el.id}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        datalist: state.roleList
    }
}
const mapDispacthToProps = {
    actionCreator: () => {
        // middleware 
        return (dispatch) => {
            axios.get('http://localhost:8000/roles').then(res => {
                // console.log(res.data);
                dispatch({
                    type: "stelele",
                    payload: res.data
                })
                // this.setState({
                //     datalist: res.data
                // })
            })
        }
    }
}
export default connect(mapStateToProps,mapDispacthToProps)(Role)