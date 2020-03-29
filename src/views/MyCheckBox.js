import React, { Component } from "react"

class MyCheckBox extends Component {

    state = {
        checked: false
    };

    handleChange = () => {
        if (this.state.checked)
            this.setState({ checked: false });
        else
            this.setState({ checked: true });
    };

    render() {
        return (
            <input
                type={"checkbox"}
                checked={this.state.checked}
                onChange={this.handleChange}
            />
        );
    }

}

export default MyCheckBox