import { Component } from "react";

class Home extends Component {
    constructor() {
        super()
        this.state = {
            data : null
        }
    }
    getWelcomeResponse = () => {
        const payload = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            }
        }
        fetch("http://localhost:3000/home", payload)
            .then(response => response.json())
            .then(data => this.setState({ data }))
    }
    componentDidMount(){
        this.getWelcomeResponse()
    };
    componentDidUpdate(prevprops, prevstate) {
        if (prevprops.token !== this.props.token) {
            this.getWelcomeResponse()
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.data &&  this.state.data.username}</h1>
            </div>
        )
    }
}

export default Home