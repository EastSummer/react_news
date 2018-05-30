import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.MenuItemGroup;

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "top",
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: "",
            userId: 0
        }
    }

    componentWillMount(){
        if(localStorage.userId !== ""){
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userId: localStorage.userId
            })
        }
    }

    setModalVisible = value =>{
        this.setState({modalVisible: value})
    }

    handleClick = e =>{
        if(e.key=="register"){
            this.setState({current: 'register'})
            this.setModalVisible(true)
        }else{
            this.setState({current: e.key})
        }
    }
    handleSubmit = e =>{
        e.preventDefault();
        let myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+
        this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="
        +formData.r_userName+"&r_password="+formData.r_password
        +"&r_confirmPassword="+formData.r_confirmPassword, myFetchOptions)
        .then(response=>response.json()).then(json=>{
            this.setState({
                userNickName: json.NickUserName,
                userId: json.UserId
            })
            localStorage.userId = json.userId;
            localStorage.userNickName = json.userNickName;
        })
        if(this.state.action == "login"){
            this.setState({hasLogined: true})
        }
        message.success("请求成功！")
        this.setModalVisible(false);
    }

    callback = key =>{
        if(key==1){
            this.setState({action: 'login'})
        }else if(key == 2){
            this.setState({action: 'register'})
        }
    }

    login = e =>{
        this.setModalVisible(true);
    }

    logout = e =>{
        localStorage.userId = "";
        localStorage.userNickName = "";
        this.setState({hasLogined: false});
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined ?
        <span>
            <Icon type="logout" onClick={this.logout} />
            <Link>
                <Icon type="inbox" />
            </Link>
        </span>
        :
        <Icon type="setting" onClick={this.login} />
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt="logo" />
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} 
                    onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange={this.callback}>
                    <TabPane tab="登录" key="1">
                        <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <FormItem label="账户">
                            {getFieldDecorator('userName')(
                                <Input placeholder="请输入你的账号" />
                            )}
                            </FormItem>
                            <FormItem label="密码">
                            {getFieldDecorator('password')(
                                <Input type="password" placeholder="请输入你的账号" />
                            )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form>
                    </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem label="账户">
                                {getFieldDecorator('r_userName')(
                                    <Input placeholder="请输入你的账号" />
                                )}
                                </FormItem>
                                <FormItem label="密码">
                                {getFieldDecorator('r_password')(
                                    <Input type="password" placeholder="请输入你的账号" />
                                )}
                                </FormItem>
                                <FormItem type="password" label="确认密码">
                                {getFieldDecorator('r_confirmpassword')(
                                    <Input type="password" placeholder="请再次输入你的密码" />
                                )}
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default MobileHeader = Form.create({})(MobileHeader)