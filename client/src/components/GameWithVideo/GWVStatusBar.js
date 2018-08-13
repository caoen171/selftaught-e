import React, { Component } from 'react';
//begin css
const statusBarStyle={
    width: "640px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    // :"greenyellow",
    height: "30px",
    textAlign: "center",
    top:"20px"
}

const iconPanelStyle={
    display: "inline-block"
}

const truStyle={ 
    color: "green"
}

const falStyle={
    color: "red"
}

const undStyle={
    color: "gray"
}

//end css

//begin define small components
const Tru = () => {
    return(
        <i style={truStyle} className="material-icons tru">check</i>
    )
}

const Fal  = () => {
    return(
        <i style={falStyle} className="material-icons fal">clear</i>
    )
}

const Und  = () => {
    return(
        <i style={undStyle} className="material-icons und">radio_button_unchecked</i>
    )
}

//end define small components


//main
class GWVStatusBar extends Component {
    convertStatusToComponent = () => {
        return this.props.ansStatus.map((value,key)=>{
            switch (value) {
                case true:
                    return <Tru key={key}/>
                case false:
                    return <Fal  key={key}/> 
                default:
                    return <Und  key={key}/> ;
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row relative">
                    <div className="statusBar" style={statusBarStyle}>
                        <div className="iconPanel" style={iconPanelStyle}>
                           {this.convertStatusToComponent()}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default GWVStatusBar;