import React from 'react';

class CustomerDelete extends React.Component{

   deleteCustomer(id){//버튼을 클릭했을 때 실제로 고객데이터 삭제기능
     console.log('삭제');
       const url='/api/customers/'+id; //rest api에서 고객데이터를 특정한 id로 삭제할 때
       fetch(url,{//해당 url 접속
           method:'DELETE'//DELETE METHOD로 해당경로에 접속 했을 때 삭제가 이루어 지도록 함
       });

       this.props.stateRefresh(); //삭제가 된후 바뀐 새로운 고객 목록 출력
   } 
   render(){
       return(
          
           <button onClick = {() =>{this.deleteCustomer(this.props.id);}} >삭제</button>
           
       )
   } 
}
export default CustomerDelete;