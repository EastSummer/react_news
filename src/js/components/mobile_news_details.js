import React from 'react';
import { Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';

export default class MoblieNewsDetails extends React.Component {
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
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey, myFetxhOptions)
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
            <div id="mobileDetailsContainer">
                <MobileHeader />
                <div className="ucmobileList"></div>
                <Row>
                    <Col span={24} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createmarkup()}></div>
                        <hr />
                        <CommonComments uniquekey={this.props.params.uniquekey} />
                    </Col>
                </Row>
                <MobileFooter />
                <BackTop />
            </div>
        )
    }
}