import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Product extends React.Component {

    render(){
        return(
        <TableRow>
        <TableCell>{this.props.productNo}</TableCell>
        <TableCell>{this.props.productNm}</TableCell>
        <TableCell>{this.props.proSmlCla}</TableCell>
        <TableCell>{this.props.productPrice}</TableCell>
        <TableCell>{this.props.productStockQt}</TableCell>
        <TableCell>{this.props.releaseStDt}</TableCell>
        <TableCell>{this.props.releaseEdDt}</TableCell>
        <TableCell>{this.props.deleveryAvailableDt}</TableCell>
        <TableCell> {this.props.manufacturer}</TableCell>
        <TableCell>{this.props.unitPack}</TableCell>
        <TableCell> {this.props.mkDt}</TableCell>
        <TableCell>{this.props.userRvPoint}</TableCell>
        <TableCell> {this.props.discountRate}</TableCell>
        <TableCell>{this.props.productImg}</TableCell>
        </TableRow>
        );
    }
} 


export default Product;
