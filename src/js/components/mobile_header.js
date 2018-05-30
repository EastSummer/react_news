import React from 'react';
import { Icon } from 'antd';

export default class MobileHeader extends React.Component {
    render() {
        const userShow = !this.state.hasLogined ?
        <Link>
            <Icon type="inbox" />
        </Link>
        :
        <Icon type="setting" onClick="{this.login.bind(this)}" />
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt="logo" />
                    <span>ReactNews</span>
                </header>
            </div>
        )
    }
}