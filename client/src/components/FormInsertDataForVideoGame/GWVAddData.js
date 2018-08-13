import React, { Component } from 'react';
import GWVAddItem from './GWVAddItem';
import ReactPlayer from 'react-player';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addVideo } from '../../actions/videoActions';

const btnBlockStyle={
    display:"block",
    width:"100%"
}
 
class GWVAddData extends Component {

    constructor(props) {
        super(props);
        this.state = {
                listItem:[0],
                btnBlock:true,
                urlBlock:false,
                videoError:false,
                url: "",
                Time: [],
                Question: [
                    // {
                    //     "Ques": "this is 4",
                    //     "Ans": ["4.1", "4.2", "4.3", "4.4"],
                    //     "trueAns": "D"
                    // }
                ],
                currentItem:0
        }
    }
    
    videoStart = ()=>{
        this.setState({
            ...this.state,
            videoError:false,
            btnBlock:false
        });
    }

    videoLoadError = ()=>{
        this.setState({
            ...this.state,
            videoError:true,
            btnBlock:true
        });
        alert('vui lòng kiểm tra lại url hoặc kết nối mạng');
    }

    onUrlChange = (event)=>{
        this.setState({
            ...this.state,
            url:event.target.value
        });
    }

    getDataFromItem = (data) => {
        //data la array gom 0:time,1:data,2:index cua item hien tai,3: item ke tiep[chu y : -1 la ket thuc lm cau hoi]
        //let new_state = Object.assign({}, this.state); 
        // let a = new_state.arr;
        // a[index] = "random element";
        // this.setState({arr: a}); 
        // stop tí ,hiểu đại khái rồi, bây giờ m nói về m đang định load ra cái gì đi và nó ở đoạn nào <!DOCTYPE html>
        if (this.state.Time[data[2]] === undefined || this.state.Question[data[2]] === undefined) {
            //truong hop them moi thì push 
            let new_state = Object.assign({}, this.state);
            let t = new_state.Time;
            let q = new_state.Question;
            q.push(data[1]);
            t.push(data[0]);
            this.setState({
                ...this.state,
                Time: t,
                Question: q
            });
        } else {
            //truong hop sua thì set
            let new_state = Object.assign({}, this.state);
            let t = new_state.Time;
            let q = new_state.Question;
            t[data[2]] =data[0];
            q[data[2]] =data[1];
            this.setState({
                ...this.state,
                Time: t,
                Question: q
            });
        }
        //sau dố gọi hàm hiện j tiếp theo
        this.renderNext(data[3]);
    }

    //enter url and render form
    enterUrl = ()=>{
            this.setState({
                ...this.state,
                urlBlock:true,
                btnBlock:true,
            });
            //sau đó render component con vào addItem
            ReactDOM.unmountComponentAtNode(document.getElementById('addItem'));
            ReactDOM.render(
            <GWVAddItem 
            time={this.state.Time[this.state.currentItem]}
            index={this.state.currentItem}
            getDataFromItem={(data)=>{this.getDataFromItem(data)}}
            dataFromItem={this.state.Question[this.state.currentItem]}
            />
            ,document.getElementById('addItem'))

    }

    renderNext =(nextIndex)=>{
        //bỏ cái hiện tại được render trong addItem
        ReactDOM.unmountComponentAtNode(document.getElementById('addItem'));
        
        if (nextIndex !== -1) {      //khác -1 ==> làm tiếp  
        //cau tiep
        //  console.log(nextIndex);
        //  console.log(this.state.currentItem);
        
        this.setState({
            ...this.state,
            currentItem: nextIndex
        },()=>{
            ReactDOM.render(
            <GWVAddItem 
            time={this.state.Time[this.state.currentItem]}    //truyền vào giá trị time(giá trị để khi chỵ video sex dừng để hỏi câu hỏi)
            index={this.state.currentItem}  //truyền vào index
            getDataFromItem={(data)=>{this.getDataFromItem(data)}} //hàm lấy data từ components con sau khi thêm mới hoặc sửa
            dataFromItem={this.state.Question[this.state.currentItem]}  //truyền data vào component con cho trường hợp sửa
            />
            ,document.getElementById('addItem'))
        });


        } else {    //ket thuc
            this.finishSession()
        }
    }

    finishSession =()=>{
        //đóng gói dữ liệu
        let DATA ={};
        DATA.url = this.state.url;
        DATA.Time = this.state.Time;
        DATA.Question = this.state.Question;
        console.log(DATA);  
        this.props.addVideo(DATA);
        /// DATA là giá trị cần gửi về để up lên cơ sở dữ liệu
        setTimeout(() => {
            this.setState({
                listItem:[0],
                btnBlock:true,
                urlBlock:false,
                videoError:false,
                url: "",
                Time: [],
                Question: [
                ],
                currentItem:0
            });
        }, 1000);

        ReactDOM.render(
            (
                <blockquote className="card-panel center-align">
                    <h4>Video của bạn đã được ghi nhận</h4>
                </blockquote>
            )
            ,document.getElementById('renderNotiFinish'));
        
        setTimeout(()=>{
            ReactDOM.unmountComponentAtNode(document.getElementById('renderNotiFinish'))
        },5000)

        }

    render() {
        //đầu tiên hiển thị 1 form chỉ có tiêu đề và thanh nhập url , nút ok bị disable
        return (
            <div className="container">
                <div className="card-panel">
                    <div className="row center-align">
                        <h3>Thêm mới dữ liệu cho video</h3>
                    </div>
                    <div className="row">
                        <div className="input-field col s10">
                        {/* kiểm tra sự thay đổi của url,mỗi lần thay đổi lưu vào trong state this.state.url  */}
                            <input id="url" type="url" disabled={this.state.urlBlock} value={this.state.url} onChange={(event)=>this.onUrlChange(event)} className="validate"/>

                            <label htmlFor="url">Url video</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s2">
                        {/* nút sau khi hết bị disable nếu nhấn sẽ khóa nút và thanh nhập url lại */}
                            <button className="btn waves-effect waves-light btn-block" onClick={()=>this.enterUrl()} disabled={this.state.btnBlock} style={btnBlockStyle}>Ok</button>
                        </div>
                        <div className="col 10"></div>
                        <div className="col s12 " id="renderNotiFinish">
                        
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                        {/* lấy url từ state làm url của ReactPlayer nếu không chạy dduocj gọi hàm báo lỗi url
                        nếu chạy được gọi hàm để bắt đầu :hàm bắt đầu set disable nút = false */}
                            <ReactPlayer onStart={()=>{this.videoStart()}} onError={()=>this.videoLoadError()} url={this.state.url} playing={true}/>
                        </div>
                    </div>

                    <div className="row">
                    {/* render vào đây */}
                        <div className="col s12" id="addItem">

                        </div>
                    </div>
                </div>
            </div>
        );
    }   
    
}

export default connect(null,{addVideo}) (GWVAddData);

//somw thing here
//dữ liệu chỉ được đóng về sau khi bấm nút kết thúc
//dữ liệu gửi về có tên DATA trong function finishSession
//chỉ biết dùng react, không biết dùng redux