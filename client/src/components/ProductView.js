import React from 'react';

class ProductView extends React.Component{
    constructor(props){
        super(props);
        this.state={
           image :''
        }
    }

   render(){
       return(
           <table width='200' border='1'>
               <tr heigh='500'><td><image src={this.props.image}></image></td></tr>
               <tr heigh='20'><td> {this.props.products.name}</td></tr>
               <tr heigh='20'><td> {this.props.product.name}</td></tr>
               <tr heigh='20'><td> {this.props.productNm}</td></tr>
               <tr heigh='20'><td> {this.props.productNm}</td></tr>                                                            
           </table>
       )
   } 
}
export default ProductView;