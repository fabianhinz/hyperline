import React from 'react'
import Component from 'hyper/component'
import { cpu } from 'systeminformation'

export default class Brand extends Component {
    static displayName() {
        return 'brand'
    }

    constructor(props) {
        super(props)
    
        this.state = {
          brand: ''
        }
    }

    componentDidMount() {
        cpu().then(({ brand }) => this.setState({ brand }))
    }

    render() {
        return (
            <div className="wrapper">
                {this.state.brand}
            </div>
        )
    }
}