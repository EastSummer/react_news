import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';
import {Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Card, Modal } from 'antd';
const FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor(){
        super()
        this.state = {
            comments: ""
        }
    }

    componentDidMount(){
        let myFetxhOptions = {
            method: "GET"
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey, myFetxhOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({comments: json})
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        let myFetxhOptions = {
            method: "GET"
        },
            formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userId
        +"&uniquekey="+this.props.uniquekey
        +"&commnet="+formdata.remark, myFetxhOptions)
        .then(response=>response.json())
        .then(json=>{
            this.componentDidMount()
        })
    }

    render(){
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ?
        comments.map((comment, index)=>(
            <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        :
        "没有加载到用户评论";
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                    {commentList}
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="您的评论">
                                {getFieldDecorator('remark',{initialValue:''})(
                                    <Input type="textarea" placeholder="您的评论" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">提价评论</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments)