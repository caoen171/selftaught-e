import React, { Component } from 'react';
//start css
const GWVFormAnsStyle = {
    "display":"block",
    "width":"660px",
    "height":"362px",
    "position": "absolute",
    "top":"60px",
    "left":"50%",
    "transform": "translateX(-50%)",
    "zIndex":"3",
    "background":"black",
    
}

const cardPanelStyle = {
    "marginTop":"50px", 
    "width": "100%",
    "paddingTop": "10px",
    "paddingBottom": "10px"
}

const questionStyle={
    "fontSize": "20px",
    "margin": "5px"
}

const btnBlockStyle={
    "display": "block",
    "width": "100%"
}

const colS6AnsStyle={
    "marginBottom": "10px"
}
//finish css


//main
class GWVFormAns extends Component {
    isClick = (event) => {//su kien click gan vao cac button dap an
        if(this.props.ansObject.trueAns ===  event.target.name){
            this.props.chooseAns([this.props.index,true])
        }else{
            this.props.chooseAns([this.props.index,false])
        }
    }

    render() {
        return (
            <div style={GWVFormAnsStyle} className="container">
                <div className="row relative">
                    <div className="form">
                        <div className="row">
                            <div className="card-panel" style={cardPanelStyle}>
                                <p className="question" style={questionStyle}>
                                    <b>{this.props.ansObject.Ques}</b>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <hr />
                        </div>
                        <div className="row">
                            <div className="col s6 ans" style={colS6AnsStyle}>
                                <button className="waves-effect waves-light btn btn-block" name="A" onClick={(event)=>this.isClick(event)} style={btnBlockStyle}>
                                {this.props.ansObject.Ans[0]}</button>
                            </div>
                            <div className="col s6 ans" style={colS6AnsStyle}>
                                <button className="waves-effect waves-light btn btn-block" name="B" onClick={(event)=>this.isClick(event)} style={btnBlockStyle}>
                                {this.props.ansObject.Ans[1]}
                                </button>
                            </div>
                            <div className="col s6 ans" style={colS6AnsStyle}>
                                <button className="waves-effect waves-light btn btn-block" name="C" onClick={(event)=>this.isClick(event)} style={btnBlockStyle}>
                                {this.props.ansObject.Ans[2]}
                                </button>
                            </div>
                            <div className="col s6 ans" style={colS6AnsStyle}>
                                <button className="waves-effect waves-light btn btn-block" name="D" onClick={(event)=>this.isClick(event)} style={btnBlockStyle}>
                                {this.props.ansObject.Ans[3]}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        );
    }
}

export default GWVFormAns;