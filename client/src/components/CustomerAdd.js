import React from 'react';
//포스트 방식으로 고객 추가 데이터 서버로 보낼 수 있도록 axios 에서 포스트 라이브러라 추가
import {post} from 'axios';

class CustomerAdd extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={            
            file    :null,  //binary 형태의 데이터 
            userName:'',
            birthday:'',
            gender  :'',
            job     :'',           
            fileName: ''  //이미지 파일 이름

        }
    }



    handleFormSubmit =(e)=>{ //고객 데이터 추가 
        console.log("1");
        e.preventDefault()//데이터가 서버에 전달 될때 오류가 발생하지 않도록 해주는 함수
        this.addCustomer()
            .then((response) =>{//서버로 부터 어떤 응답이 왔을 때 건너온 데이터를 콘솔창에 출력
                console.log(response.data);
   //             this.props.stateRefresh();//고객추가-> 서버응답->고객목록 다시 불러옴
            })
            console.log("2");
        // this.setState({           
        //     file    :null,  //binary 형태의 데이터 
        //     userName:'',
        //     birthday:'',
        //     gender  :'',
        //     job     :'',           
        //     fileName:''  //이미지 파일 이름
        
        // })

    }

    handleValueChange =(e) =>{
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    } 

    handleFileChange =(e) => {

    
        this.setState({
            file: e.target.files[0],//e.target=이벤트가 발생한 인풋 값 자체
            fileName :e.target.value
             
        })
    }

    addCustomer=()=>{
        console.log("2");
        const url ='/api/customers/add';
        const formData=new FormData();
        formData.append('image',    this.state.file);
        formData.append('name',     this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender',   this.state.gender);
        formData.append('job',      this.state.job);
        const config ={//헤더정보
            headers:{
                'content-type' : 'multipart/form-data'//전달하고자 하는 데이터에 파일이 포함되어 있을 때 설정
            }

        } 
        console.log(formData);
        return post(url,formData,config);//post 라이브러리를 이용해서 해당 url에 formData를 해당 환경 설정에 맞게 헤더를 붙여서 실제로 서버로 데이터 보냄
    }
    render(){
        //고객 추가 양식이 어떤식으로 보여지는지 
         return(
             //고객 추가 버튼을 눌렀을 때  handleFormSubmit 함수가 수행
             <form >
                <h1>고객 추가</h1> 
                프로필 이미지: <input type ="file" name="file"    value={this.state.fileName} onChange={this.handleFileChange} file={this.state.file} /><br/>
                이름 :        <input type ="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 :    <input type ="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별  :       <input type ="text" name="gender"   value={this.state.gender}   onChange={this.handleValueChange}/><br/>
                직업  :       <input type ="text" name="job"      value={this.state.job}      onChange={this.handleValueChange}/><br/>
                <button type="submit" onClick={this.handleFormSubmit}>추가하기</button>
             </form>
             //input tag 가 있으면 값들이 변경 되었을 떄 상태 변화 감지 (onChange)

         )

    }

}

export default CustomerAdd; //외부라이브러리 사용

