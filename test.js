import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'

@connect(
    state => state.user
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const alert = Modal.alert
        alert("注销", "确认退出登陆吗？", [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确认', onPress: () => {
                    browserCookie.erase('userid')
                }
            }
        ])

    }

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        // return props.user ?
        //     (
        //         <div>
        //             <Button type="primary" onClick={this.logout}>test</Button>
        //             <Result
        //                 img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt=""/>}
        //                 title={props.user}
        //                 message={props.type === 'boss' ? props.company : null}
        //             />
        //             <List renderHeader={() => '简介'}>
        //                 <Item multipleLine>
        //                     {props.title}
        //                     {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
        //                     {props.money ? <Brief>薪资:{props.money}</Brief> : null}
        //                 </Item>
        //             </List>
        //             <WhiteSpace/>
        //
        //             <List>
        //                 <Item onClick={this.logout}>退出登陆</Item>
        //             </List>
        //         </div>
        //     ) : null
        return <Button type="primary" onClick={this.logout}>test</Button>
    }

}

export default User