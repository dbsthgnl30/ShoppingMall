import React,{Component} from 'react';
import Customer from './components/Customer';
import CustomerAdd from'./components/CustomerAdd';
import './App.css';  
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
      customers:'',
      completed:0,
      searchKeyword :''//모든 문자열은 빈 문자열을 포함하고 있기 때문에 처음에 새로고침하면 다 나옴
    }

  }
  stateRefresh =() =>{//state 초기화 ,고객데이터가 추가,삭제 될 때 함께 실행됨
    this.setState({
      customers:'',
      complieted: 0,
      searchKeyword :''//r검색창 내용 초기화
    });
    this.callApi()//고객 목록을 새롭게 다시 불러옴 
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  } 

 
  componentDidMount(){
    this.timer=setInterval(this.progress,20);  
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response= await fetch('/api/customers');
    const body= await  response.json();    
    return body;
  }

  progress = () => {
    const {completed}=this.state;
    this.setState({completed : completed >= 200 ? 0 : completed +10 });

  }
  handleValueChange=(e) =>{//입력값을 상태변화로써 감지해 리액트내부에서 해당데이터를 가지도록함
    let nextState ={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);

  }

  render(){
    //각 데이터를 필터를 거친 이후에 출력
    const filteredComponents = (data) => {//어떤 데이터를 입력(매개변수)으로 받았을 때
      data = data.filter((c) => {//그 데이터에 필터를 적용하도록 만듬
      return c.name.indexOf(this.state.searchKeyword) > -1;// 그 데이터가 배열 형태로 존재 한다고 했을 때 각 원소중에서 그 원소의 이름값에  사용자가 검색한키워드(searchKeyword)가 포함되어있는지 여부를 파악하고 있으면 그 데이터만 남겨놓고 데이터 라는 변수에 담음
      });
      return data.map((c) => {// 데이터를 맵함수를 이용해 각 원소를 출력
      return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
      }

    const{classes}=this.props;
    const cellList=["번호","프로필이미지","이름","생년월일","성별","직업","설정"]
    return (
       <div className={classes.root}> 
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                고객 관리 시스템
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="검색하기"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"//실제 사용자가 입력한 문자를 관리
                  value={this.state.searchKeyword}//저장되어있는 상태값을 담음
                  onChange={this.handleValueChange} //실제로 변경되면 handleValueChange로 불러옴
                />
              </div>
            </Toolbar>
          </AppBar>  
          <div className={classes.menu}> 
          <CustomerAdd stateRefresh={this.stateRefresh}/> 
          </div>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                 {cellList.map(c=> {
                   return <TableCell className={classes.tableHead}>{c}</TableCell>
                 })}
                </TableRow>
            </TableHead>

            <TableBody>
              {this.state.customers ?  
              //고객데이터가 존재하는 경우엔 필터를 수행한 고객데이터가 나오도록함
                filteredComponents(this.state.customers) : 
              //존재하지않을 때는 고객 데이터를 불러오고있는 중인 그림나옴
              <TableRow>
                <TableCell colSpan ="6" align="center">  
                  <CircularProgress  className={classes.progress} variant ="determinate" value={this.state.completed}/>
               </TableCell>
              </TableRow>
                   }
            </TableBody>
          </Table>
        </Paper> 
         
        </div>//CustomerAdd를 화면에 출력 할 때 props값으로 stateRefresh(함수 자체를  props형태로)
            );
    } 
}

export default withStyles(styles)(App);
