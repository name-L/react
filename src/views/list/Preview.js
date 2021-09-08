import React, { Component } from 'react'
import axios from 'axios'
import { PageHeader } from 'antd'
export default class Preview extends Component {
    state = {
        title: '',
        category: [],
        content:""
    }
    componentDidMount() {
        // console.log("获取id 在获取ajax请求", this.props.match.params.myid);
        axios.get(`http://localhost:8000/articles/${this.props.match.params.myid}`).then(res => {
            console.log(res.data);
            let { title, category, content } = res.data
            this.setState({
                title,
                category,
                content
            })
        })
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        this.props.history.goBack()
                    }}
                    title={this.state.title}
                    subTitle={this.state.category.join("-")}
                />
                <div style={{marginLeft:"20px"}} dangerouslySetInnerHTML={{
                    __html:this.state.content
                }}>
                </div>
            </div>
        )
    }
}
