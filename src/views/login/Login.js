import React, { Component } from 'react'
import Particles from 'react-particles-js'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import axios from 'axios'
export default class Login extends Component {
    onFinish = values => {
        // console.log('Received values of form: ', values);
        axios.get(`http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=true`).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                localStorage.setItem("isLogin", true)
                localStorage.setItem("users",JSON.stringify(res.data[0])) //只能存字符串
                this.props.history.push('/')
            } else {
                message.error('This is an error message');
            }

        })
    };
    render() {
        return (
            <div style={{ background: "rgb(35,39,65)", height: "100%" }}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }} //初始值
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>
                    </Form.Item>
                </Form>
                <Particles height={window.innerHeight - 6 + "px"} params={{
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 800,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 800,
                                "size": 80,
                                "duration": 2,
                                "opacity": 0.8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 400,
                                "duration": 0.4
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                }}></Particles>
            </div>
        )
    }
}
