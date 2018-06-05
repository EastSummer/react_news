import React from "react";
import {Row, Col, Tabs, Carousel} from 'antd'
import PCNewsBlock from './pc_news_block'
import PCNewsImageBlock from './pc_news_image_block'
import PCProduct from './pc_products'
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
    render(){
        const settings = {
            dots: true,
            autoplay: true
        }
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">
                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg" /></div>
                                    <div><img src="./src/images/carousel_2.jpg" /></div>
                                    <div><img src="./src/images/carousel_3.jpg" /></div>
                                    <div><img src="./src/images/carousel_4.jpg" /></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px" />
                        </div>
                        <Tabs className="tabs_news" type="card">
                            <TabPane tab="头条" key="1">
                                <PCNewsBlock count={21} type="top" />
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={21} type="guoji" />
                            </TabPane>
                        </Tabs>
                        <Tabs className="tabs_product">
                            <TabPane tab="ReactNews 产品" key="1">
                                <PCProduct />
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="130px" />
                            <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="130px" />
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}