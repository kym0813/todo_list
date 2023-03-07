import React, {Component} from "react";
import "./App.css";
export default class App extends Component {
    state = {
        todoData: [
            {
                id: "1",
                title: "공부하기",
                completed: false
            },
            {
                id: "2",
                title: "청소하기",
                completed: false
            },
        ],
        value: ""
    };
    btnStyle = {
        color:"#fff",
        border: "none",
        padding: "5px 9px",
        borerRadius: "50%",
        cursor:"pointer",
        float:"right"
    };
    getStyle = (completed) => {
        return {
            padding: "10px",
            borderBottom: "1px dotted #ccc",
            textDecoration: completed ?"line-through" : "none",
        };
    };



    handleClick = (id) => {
        let newTodoData = this.state.todoData.filter((data) => data.id !== id);
        this.setState({todoData: newTodoData});
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        // 새로운 할 일 데이터
        let newTodo = {
            id: Date.now(),
            title: this.state.value,
            completed: false,
        };

        // 원래 있던 할 일에 새로운 일 더해주기
        this.setState({ todoData: [...this.state.todoData, newTodo], value: ""});
    };

    handleCompleteChane = (id) => {
        let newTodoData = this.state.todoData.map(data => {
            if(data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="todoBlock">
                    <div className="title">
                        <h1>할 일 목록2</h1>
                    </div>

                    {this.state.todoData.map((data) => (
                        <div style={this.getStyle(data.completed)} key={data.id}>
                            <input type="checkbox" defaultChecked={false} onChange={() => this.handleCompleteChane(data.id)} />
                            {data.title}
                            <button
                                style={this.btnStyle}
                                onClick={() => this.handleClick(data.id)}
                            >
                                x
                            </button>
                        </div>
                    ))}

                    <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="value"
                            style={{ flex: "10", padding: "5px" }}
                            placeholder="해야 할 일을 입력하세요."
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <input
                            type="submit"
                            value="입력"
                            className="btn"
                            style={{flex: "1"}}
                        />
                    </form>

                </div>
            </div>

        );
    }
}