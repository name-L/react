import React, { Component } from 'react'
// import Axios from 'axios'
// const Context = React.createContext()
export default class Home extends Component {
    state = {
        isshow: true
    }
    render() {
        return (
            <div>
                Home

                <Homm kerwen={() => {
                    this.setState({
                        isshow: !this.state.isshow
                    })
                }}></Homm>
                {
                    this.state.isshow ?
                        <Homn></Homn> : null
                }
            </div>
        )
    }
    componentDidMount() {
        // Axios.get("/ajax/mostExpected?ci=268&limit=10&offset=0&token=&optimus_uuid=A8DA5AE04FEC11EAA2ACCF5B69D3C6B1B678374B63654907B6F41638919201D4&optimus_risk_level=71&optimus_code=10").then(res=>{
        //     console.log(res.data);

        // })
    }

}




class Homm extends Component {
    render() {
        return (
            <div>
                <div style={{ background: 'red', width: '43px' }}>
                    <button onClick={this.onClick}>click</button>
                </div>
            </div>
        )
    }
    onClick = () => {
        this.props.kerwen()
    }
}

class Homn extends Component {
    render() {
        return (
            <div>
                <div style={{ background: 'yellow' }}>
                    <ul>
                        <li>111</li>
                        <li>222</li>
                        <li>333</li>
                    </ul>
                </div>
            </div>
        )
    }
}


