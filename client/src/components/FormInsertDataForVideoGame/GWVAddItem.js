import React, { Component } from 'react';

//begin css
const btnBlockStyle={
    display:"block",
    width:"100%"
}
//end css

class GWVAddItem extends Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }
        //check xem them moi hay 
    checkStatus = ()=>{
        // console.log(this.props.dataFromItem);       
        if (this.props.dataFromItem === undefined) {
            //xóa tức data truyền vào === undefi
            this.setState({
                ...this.state, 
                status:1, //add,
                AnsA: "",
                AnsB: "",
                AnsC: "",
                AnsD: "",
                Sec:"",
                Min:"",
                AnsTrue:"",
                Ques:"",
            });
        } else {
            //nếu data truyền vào có dữ liệu thì là sửa
            //đặt các defaulValue = giá trị các phần tương ứng được truyền vào 
            var tempTime =parseInt(this.props.time,10);
            var tempSec = tempTime%60;
            var tempMin = (tempTime - tempSec)/60;
            // console.log(tempSec);
            this.setState({
                ...this.state,
                status:0, //change
                AnsA: this.props.dataFromItem.Ans[0],
                AnsB: this.props.dataFromItem.Ans[1],
                AnsC: this.props.dataFromItem.Ans[2],
                AnsD: this.props.dataFromItem.Ans[3],
                Sec:tempSec,
                Min:tempMin,
                AnsTrue:this.props.dataFromItem.trueAns,
                Ques:this.props.dataFromItem.Ques,
            });
   
        }
   }
        //check tat ca input deu da duoc dien va check xem dap an dung co dien là A/B/C/D khong
        // bay giơ may nói tổng quan xem nó sẽ hoạt động như thế nào , comment vào dòng code chạy ấy , d

    checkAll =()=>{
        var c1 = undefined;
        if (
            this.state.AnsA === "" ||          
            this.state.AnsB === "" ||          
            this.state.AnsC === "" ||          
            this.state.AnsD === "" ||          
            this.state.Sec === "" ||          
            this.state.Min === "" ||                    
            this.state.Ques === ""       
        ) { 
            c1 = true
        } else  {
            c1 = false
        }   
        let c2 = undefined;
        if (
            this.state.AnsTrue  === "A"||
            this.state.AnsTrue  === "B"||
            this.state.AnsTrue  === "C"||
            this.state.AnsTrue  === "D"
        ) {
            c2 = false
        } else {
            c2 = true
        }

        if (c1 === true || c2 === true) {
            return true
        } else {
            return false   
        }
    }



    //kiem tra co phai cau dau khong (de disable nut cau truoc)
    checkFirst = ()=>{
        if (this.props.index === 0) {
            return true
        } else {
            return false
        }
    }

    checkPrevious =()=>{
        let c1 = this.checkFirst();
        let c2 = this.checkAll();
        if (c1 === false && c2 === false) {
            return false
        } else {
            return true
        }
    }

    isChange = (event)=>{  
        //khi các trường thay đổi nhận các giá trị và truyền vào trong state
       let name = event.target.name;
       let value = event.target.value;
       this.setState({
           ...this.state,
           [name]:value
       });     
    }

    componentWillMount() {
        //chạy đầu tiên kiểm tra xem đây là thêm hay sửa
        this.checkStatus()
    }
    // su kien nut cau truoc click
    previousClick =()=>{
        this.sendData(parseInt(this.props.index,10)-1);
    }
    //su kien nut cau sau click
    afterClick =()=>{
        this.sendData(parseInt(this.props.index,10) + 1);
    }
    //su kien finish click
    finishClick =()=>{
        this.sendData(-1);
    }

    sendData = (indexNext) => {
        
        let tempData = {
            Ques: this.state.Ques,
            Ans: [this.state.AnsA, this.state.AnsB, this.state.AnsC, this.state.AnsD],
            trueAns: this.state.AnsTrue
        };
        let tempTime = (parseInt(this.state.Min,10)) * 60 + parseInt(this.state.Sec,10);
        this.props.getDataFromItem([tempTime, tempData,this.props.index,indexNext]);        //gửi về component cha dữ liệu bao gồm: 
        //0:thời gian để dừng cho câu hỏi hiện tại
        //1: câu hỏi,các đáp án và đáp án đúng
        //2: index câu hỏi hiện tại
        //3:index câu tiếp theo{-1 tức là kết thúc phiên làm cho video này, +- 1 so vs index câu hiện tại thì hiện câu tiếp}
        //nếu index truyền vào = 0 thì nút câu trước sẽ bị disable

    }


    checkActiveInput =()=>{
        if (this.state.status === 0) {
            return "active"
        } else {
            return ""
        }
    }



    render() {
        return (
            <div className="row">
                <div className="form">
                    <div className="row">
                        <div className="row">
                            <div className="col s12 input-field">
                                <input id="Ques" name="Ques" type="text" className="validate input" onChange={(event)=>{this.isChange(event)}} defaultValue={this.state.Ques}/>
                                <label className={this.checkActiveInput()} htmlFor="Ques">Câu hỏi {this.props.index + 1}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className="row">
                                    <div className="col s6 input-field">
                                        <input id="Min" name="Min" min={0} type="number" defaultValue={this.state.Min} className="validate input" onChange={(event)=>{this.isChange(event)}} />
                                        <label className={this.checkActiveInput()} htmlFor="Min">Phút</label>
                                    </div>
                                    <div className="col s6 input-field">
                                        <input id="Sec" name="Sec" min={0} type="number" defaultValue={this.state.Sec} className="validate input" onChange={(event)=>{this.isChange(event)}} />
                                        <label className={this.checkActiveInput()} htmlFor="Sec">Giây</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s3 input-field">
                                <input id="AnsA" name="AnsA" type="text" className="validate input" onChange={(event)=>{this.isChange(event)}} defaultValue={this.state.AnsA}/>
                                <label className={this.checkActiveInput()} htmlFor="AnsA">Nhập đáp án A</label>
                            </div>
                            <div className="col s3 input-field">
                                <input id="AnsB" name="AnsB" type="text" className="validate input" onChange={(event)=>{this.isChange(event)}} defaultValue={this.state.AnsB}/>
                                <label className={this.checkActiveInput()} htmlFor="AnsB">Nhập đáp án B</label>
                            </div>
                            <div className="col s3 input-field">
                                <input id="AnsC" name="AnsC" type="text" className="validate input" onChange={(event)=>{this.isChange(event)}} defaultValue={this.state.AnsC}/>
                                <label className={this.checkActiveInput()} htmlFor="AnsC">Nhập đáp án C</label>
                            </div>
                            <div className="col s3 input-field">
                                <input id="AnsD" name="AnsD" type="text" className="validate input" onChange={(event)=>{this.isChange(event)}} defaultValue={this.state.AnsD}/>
                                <label className={this.checkActiveInput()} htmlFor="AnsD">Nhập đáp án D</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6 input-field">
                                <input id="AnsTrue" name="AnsTrue" type="text" className="validate" onChange={(event)=>{this.isChange(event)}} defaultValue={this.state.AnsTrue}/>
                                <label className={this.checkActiveInput()} htmlFor="AnsTrue">Nhập đáp án đúng(A/B/C/D)</label>
                            </div>
                            {/* 3 nút kể từ đây trở xuống bị disable cho đến khi tất cả các trường đều được điền */}
                            <div className="col s3">
                                <button className="btn waves-effect waves-light btn-block" onClick={()=>{this.previousClick()}} disabled={this.checkPrevious()} style={btnBlockStyle}>Câu trước</button>
                            </div>
                            <div className="col s3">
                                <button className="btn waves-effect waves-light btn-block" onClick={()=>{this.afterClick()}} disabled={this.checkAll()} style={btnBlockStyle}>Câu tiếp/ Thêm câu</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s3"></div>
                            <div className="col s6">
                                <button className="btn waves-effect waves-light btn-block" onClick={()=>{this.finishClick()}} disabled={this.checkAll()} style={btnBlockStyle}>Hoàn tất các câu hỏi cho video
                                    này</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    componentDidMount() {
    }
    
}

export default GWVAddItem;