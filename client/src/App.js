import React,{Component} from 'react';
import Product from './components/Product';
import'./App.css';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({

  root: {
    width: "100%",
    minWidth:1080 
  },
  menu :{
    marginTop :15,
    marginBottom:15,
    display: 'flex',
    justifyContent:'center'
  },
 paper:{
   marginLeft :18,
   marginRight :18
 },
 tableHead:{
  fontSize :'1.0rem'
 },
 
  progress :{
    margin : theme.spacing(2) 
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  
   });

class App extends Component{

  constructor(props){
    super(props);
    this.state={   
      products:'',
      searchKeyword :''
    }    
  }


  componentDidMount(){

      // const res = this.callApi()
      // const err = this.setState({products: res})
      // if(err !=''){
      // }

  //this.timer=setInterval(this.progress,20);  
    this.callApi()
    .then(res => this.setState({products: res}))  //불러온값을 넣어준다. 
    .catch(err => console.log(err));
  }

 // progress = () => {
   // const {completed}=this.state;
    //this.setState({completed : completed >= 200 ? 0 : completed +10 });

//  }

  callApi = async () => {
    const response= await fetch('/api/products');
    const body= await response.json();    
    console.log(body);
    return body;
  }

  /* 
  [
    {
      productId: "001001001"
      productNm: "한국티셔츠"     
    },
    {
      productId: "001001002"
      productNm: "미국티셔츠"     
    }
  }
  */

  render(){

        //각 데이터를 필터를 거친 이후에 출력
        const filteredComponents = (data) => {//어떤 데이터를 입력(매개변수)으로 받았을 때
          console.log(data);
          data = data.filter((c) => { //name을 이용하여 검색
            return c.productNm.indexOf(this.state.searchKeyword) > -1;
          });
  
          return data.map((c) => {// 데이터를 맵함수를 이용해 각 원소를 출력
            return <Product stateRefresh={this.stateRefresh} 
                                        key                   ={c.id} 
                                        productNo             ={c.productNo} 
                                        productNm             ={c.productNm} 
                                        proSmlCla             ={c.proSmlCla} 
                                        productPrice          ={c.productPrice} 
                                        productStockQt        ={c.productStockQt} 
                                        releaseStDt           ={c.releaseStDt}
                                        releaseEdDt           ={c.releaseEdDt}
                                        deleveryAvailableDt   ={c.deleveryAvailableDt}
                                        manufacturer          ={c.manufacturer}
                                        unitPack              ={c.unitPack}
                                        mkDt                  ={c.mkDt}
                                        userRvPoint           ={c.userRvPoint}
                                        discountRate          ={c.discountRate}
                                        productImg            ={c.roductImg}
                                        
                                        />
          });
      }
  
    const{classes}=this.props;

    return(
      <div className={classes.root}> 

      <Table>            
        <TableBody>  
        {this.state.products ?  
              //고객데이터가 존재하는 경우엔 필터를 수행한 고객데이터가 나오도록함
                filteredComponents(this.state.products) : 'sad'
              //존재하지않을 때는 고객 데이터를 불러오고있는 중인 그림나옴
              
                   }
        
        
        </TableBody> 
      </Table>  
      </div>
    );
  }
}


export default withStyles(styles)(App);
