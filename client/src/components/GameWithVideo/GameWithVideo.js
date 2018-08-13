import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import GWVFormAns from './GWVFormAns';
import Data from './Data2.json';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import GWVStatusBar from './GWVStatusBar';
import {fetchVideo} from '../../actions/videoActions';

//begin css
const GameWithVideoStyle = {
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "1"
}

const noClickStyle = {
    "display": "block",
    "width": "680px",
    "height": "330px",
    "position": "absolute",
    "top": "00px",
    "left": "50%",
    "transform": "translateX(-50%)",
    "zIndex": "2",
    "background": "transparent"
}

const containerStyle = {
    position: "relative"
}

const btnBlockStyle = {
    "display": "block",
    "width": "100%"
}

const GWVEndedRowStyle = {
    "marginTop": "200px"
}
// end css

//defind small component
var GWVEnded = (props) => {
    if(props.isFirstEnd === false){
        return (
            <div className="GWVEnded" style={noClickStyle}>
                <div className="row GWVEndedRow" style={GWVEndedRowStyle}>
                    <div className="col s6">
                        <button className="waves-effect waves-light btn btn-block lime accent-2" style={btnBlockStyle}>Replay</button>
                    </div>
                    <div className="col s6">
                        <button className="waves-effect waves-light btn btn-block  blue lighten-1" style={btnBlockStyle}>Next</button>
                    </div>
                </div>
            </div>
        )
        
    }else{
        return (
            <div className="GWVEnded" style={noClickStyle}>
                <div className="row GWVEndedRow" style={GWVEndedRowStyle}>
                    <div className="col s12">
                       <h1> Now watching again and answer the question !!</h1>
                    </div>
                   
                </div>
            </div>
        )
    }
  
}

// main
class GameWithVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressPlayedSeconds: "",  //gia tri thoi gian video hien tai
            timeToStop: [],  //lay cac gia tri thoi gian de dung video hien form tra loi
            isAns: false,   //dang mo form tra loi hay khong
            ansStatus: [], //mang gia tri gom true(dung),false(sai) va undef(chua tra loi)
            ansNum: [], //
            loopVideo: true,
            endNum: 0
        }
    }

    chooseAns = (ans) => {
        //ans = [index cau hoi,gia tri dung sai cua cau tra loi]
        var tempAnsStatus = [...this.state.ansStatus];
        tempAnsStatus[ans[0]] = ans[1];
        this.setState({
            ...this.state,
            isAns: false,
            ansStatus: tempAnsStatus
        },()=>{
            console.log('setstate3')
        });
        ReactDOM.unmountComponentAtNode(document.getElementById('Ans'));//xoa form tra loi sau khi nhan ve {ans}
    }

    onEndedVideo = () => {
        if (this.state.endNum === 0) {
            var tempAns = [];
            var tempNum = [];
            for (let index = 0; index < this.props.video.video.Question.length; index++) {
                tempAns.push(undefined),
                    tempNum.push(0)
            }
            this.setState({
                ...this.state,
                endNum: 1,
                ansStatus: tempAns,
                ansNum: tempNum,
                loopVideo: false
            },()=>{
                console.log('setstate4')
            });
            ReactDOM.render(
                <GWVEnded isFirstEnd={true} />
                , document.getElementById('Ans'));

        } else if (this.state.endNum === 1) {
            ReactDOM.render(
                <GWVEnded isFirstEnd={false}/>
                , document.getElementById('Ans'));
        }

    }

    onProgress = (progress) => {

        if (this.state.endNum === 1) {
        
            this.setState({
                ...this.state,
                progressPlayedSeconds: parseInt(progress.playedSeconds + 0.5, 10) //lay gia tri thoi gian video hien tai
            },()=>{
                console.log('setstate1')
            })

            this.props.video.video.Time.forEach((el, index) => {//neu gia tri thoi gian hien tai cua video trung voi 1 trong cac moc thoi gian de dung video thi dung video va hien form
                if (this.state.progressPlayedSeconds === el) {
                    if (this.state.ansNum[index] === 0) {
                        var tempAnsNum = [...this.state.ansNum];
                        tempAnsNum[index] = 1;
                        this.setState({
                            ...this.state,
                            isAns: true,
                            ansNum: tempAnsNum
                        },()=>{
                            console.log('setstate2')
                        });
                        ReactDOM.render(
                            <GWVFormAns
                                index={index}
                                ansObject={this.props.video.video.Question[index]}//truyền gia tri vao 
                                chooseAns={(ans) => this.chooseAns(ans)}  //trả về mang 2 phan tu la index va gia tri dung sai cua cau tra loi
                            />
                            , document.getElementById('Ans'));
                    }
                }
            });
        }
    }


    componentWillMount() {
        this.props.fetchVideo(this.props.match.params._id);
        console.log(this.props.video.video);



    }

    render() {
        let renderContent;
        if (this.props.video.video._id) {
            renderContent = (
                <div style={containerStyle} className="container">
                    <GWVStatusBar ansStatus={this.state.ansStatus} />
                    <div className="row">
                        <div className="noClick" style={noClickStyle}></div>
                        <ReactPlayer style={GameWithVideoStyle} autoPlay
                            loop={this.state.loopVideo}
                            onEnded={() => this.onEndedVideo()}
                            playing={!this.state.isAns}
                            onProgress={this.onProgress}
                            url={this.props.video.video.url} 
                            width={704}/>
                        <div id="Ans"></div>
                    </div>
                </div>
            )
        }
        return (
            <div style={ {height: '500px'}}>
                {renderContent}
            </div>

        );
    }
}

function MapStateToProps({ video }) {
    return { video }
}
export default connect(MapStateToProps, { fetchVideo })(GameWithVideo);

//SOMETHING
// component GameWithVideo nhận vào data là một object có cấu trúc tương tự file Data.json và Data2.json
//không sử dụng redux và store
// video phát được lập lại 2 lần :
// lần đầu chỉ phát video không hiện câu hỏi
// lần 2 vừa phát video vừa hiện form trả lời câu hỏi
// mỗi lần trả lời câu hỏi this.state.ansStatus sẽ ghi lại trạng thái trả lời câu hỏi của cả video
// trạng thái ban đầu this.state.ansStatus sẽ chứa toàn undefined,mỗi lần trả lời sẽ biến 1 undefined tương ứng thành true hoặc false
//dùng để component bố tính điểm thưởng ..
// kết thúc lần phát thứ 2 end video,this.state.ansStatus là 1 mảng gồm các phần tử true và false ứng với đúng sai mỗi câu trả lời,
//kết thúc lần phát 2 hiện component <GWVEnded /> tạm thời có 2 nút là replay và next hiện chưa định nghĩa sự kiện click