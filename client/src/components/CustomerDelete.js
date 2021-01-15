import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class CustomerDelete extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open: false
        }
    }

    handleClickOpen =() => {//사용자가 고객추가 버튼 눌러서 고객 추가모달 팝업 창 뜸
        this.setState({
            open :true
        })
    }

    handleClose = ()=> {
    this.setState({      
         open :false//현재 팝업 창이 화면에 출력 되지 않도록
     })

    }

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
        <div>
            <Button variant="contained" color="secondary"  onClick = {this.handleClickOpen}>삭제</Button>
            <Dialog onClose={this.handleClose} open={this.state.open}>
                <DialogTitle onClose={this.handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) =>{this.deleteCustomer(this.props.id)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                </DialogActions>

            </Dialog>
        </div>
      
       )
   } 
}
export default CustomerDelete;