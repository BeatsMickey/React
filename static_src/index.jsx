import React from 'react';
import ReactDOM from 'react-dom';

let messages = ['Привет', 'Как дела?'];



class MessageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            del: 'Удалить'
        }
    }

    render() {
        return <div>{this.state.message}<div onClick={() => {this.setState({message: 'Сообщение удалено', del: null})}}>{this.state.del}</div></div>;
    }
}


class MessageField extends React.Component {

    render() {
        return (
            this.props.messages.map(message => <MessageComponent message={ message } />)
        );
    }
}

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.value);
        this.setState({
            value: ''
        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Сообщение:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );
    }
}


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages,
        };

        this.sendMessage = this.sendMessage.bind(this)
    }


    sendMessage(text) {
        this.setState({messages: [...this.state.messages, text]})
    }

    render() {
        return (
            <>
                <MessageField messages={this.state.messages}/>
                <MessageForm sendMessage={this.sendMessage}/>
            </>
        );
    }
}

ReactDOM.render(
    <App messages={messages} />,
    document.getElementById('root'),
);




