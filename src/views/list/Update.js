import React, { Component } from 'react'
import { PageHeader, Steps, Button, message, Form, Input, Cascader } from 'antd';
import Axios from 'axios';
import RichEditor from './RichEditor'
const { Step } = Steps;
export default class Update extends Component {
    state = {
        current: 0,
        categories: [],
        articleform: {},
        content: "",
        richkey: 1
    }
    componentDidMount() {
        Axios.get("http://localhost:8000/categories").then(res => {
            console.log(res.date);
            this.setState({
                categories: res.data
            })
        })
        Axios.get(`http://localhost:8000/articles/${this.props.match.params.myid}`).then(res => {
            let { title, category, content } = res.data
            // this.setState({
            //     articleform: {
            //         title: title,
            //         category: category,
            //     },
            //     content:content
            // })
            this.setState({
                content,
                richkey: 2
            })
            // 动态设置表单的value
            this.refs.addform.setFieldsValue({
                title,
                category
            })
        })
    }
    render() {
        const steps = [
            {
                title: '基本信息'
            },
            {
                title: '文章类容'
            },
            {
                title: '提交文章'
            },
        ];


        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        this.props.history.goBack()
                    }}
                    title="更新文章"
                    subTitle="This is a subtitle"
                />
                {/* 进度条 */}
                <Steps current={this.state.current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {/* 步骤条的类容 */}
                <div className="steps-content" style={{ display: this.state.current === 0 ? 'block' : 'none' }}>
                    <Form
                        ref="addform"
                        layout="vertical" // 表示垂直布局
                        name="form_in_modal"
                        initialValues={this.state.articleform}
                    >
                        <Form.Item
                            name="title"
                            label="文章标题 "
                            rules={[{ required: true, message: 'Please input the suername of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="文章分类 "
                            rules={[{ required: true, message: 'Please input the suername of collection!' }]}
                        >
                            <Cascader options={this.state.categories} onChange={this.onChange} placeholder="Please select" fieldNames={{ label: "title" }} />
                        </Form.Item>


                    </Form>
                </div>
                <div className="steps-content" style={{ display: this.state.current === 1 ? 'block' : 'none', height: "500px", overflow: 'auto' }}>
                    <RichEditor getContent={this.getContent} content={this.state.content} key={this.state.richkey}></RichEditor>
                </div>
                <div className="steps-content" style={{ display: this.state.current === 2 ? 'block' : 'none' }}>
                    请确认提交
                </div>
                {/* 控制按钮的显示 */}
                <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            下一步
                        </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                        <Button type="primary" onClick={this.handSubmit}>
                            更新
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                            上一步
                        </Button>
                    )}
                </div>
            </div>
        )
    }
    handSubmit = () => {
        let { username, roleType } = JSON.parse(localStorage.getItem("users"))
        // console.log(this.state.articleform, this.state.content);
        Axios.put(`http://localhost:8000/articles/${this.props.match.params.myid}`, {
            ...this.state.articleform,
            content: this.state.content,
            author: username,
            roleType: roleType
        }).then(res => {
            message.success("更新成功")
            this.props.history.push("/article-manage/list")
        })

    }
    getContent = (content) => {
        this.setState({
            content
        })
    }
    onChange = () => {

    }
    next() {
        if (this.state.current === 0) {
            this.refs.addform.validateFields().then(values => {
                this.setState({
                    articleform: values,
                    current: this.state.current + 1
                });
            })
            return;
        }
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

}
