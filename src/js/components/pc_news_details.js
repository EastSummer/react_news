import React from 'react';
import { Row, Col, BackTop} from 'antd';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';

export default class PCNewsDetails extends React.Component {
    constructor(){
        super()
        this.state = {
            newsItem: ""
        }
    }

    componentWillMount(){
        let myFetxhOptions = {
            method: "GET"
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.match.params.uniquekey, myFetxhOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({newsItem: json})
            document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
        })
    }

    createmarkup(){
        return {__html: this.state.newsItem.pagecontent}
    }

    render(){
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createmarkup()}></div>
                        <CommonComments uniquekey={this.props.match.params.uniquekey} />
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px" />
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter />
                <BackTop />
            </div>
        )
    }
}