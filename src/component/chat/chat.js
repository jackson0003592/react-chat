import React from 'react'
import {List, InputItem, NavBar, Icon} from "antd-mobile";
import {connect} from 'react-redux'
import {sendMsg, getMsgList, recvMsg} from "../../redux/chat.redux";

@connect(
    state => state,
    {sendMsg, recvMsg, getMsgList}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        console.log(this.props.chat.chatmsg.length)
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text

        this.props.sendMsg({from, to, msg})
        this.setState({text: ''})
    }

    render() {
        const user = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[user]) {
            return null
        }
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onClickLeft={() => this.props.history.goBack()}
                >
                    {users[user].name}
                </NavBar>

                {this.props.chat.chatmsg.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item className='chat-me' extra={<img src={avatar}/>}>{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={() => this.handleSubmit()}>发送</span>}
                        />
                    </List>
                </div>
            </div>

        )
    }

}

export default Chat