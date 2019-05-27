import React, { PureComponent } from "react";
import MainNavbar from "./navbar.component";
import axios from 'axios';

const SELECTION  = ['KG','UNIT', 'PKT'];

class Product extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          'name': '',
          'uom': '',
          'price': 0
        }
      ],
      show: false,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/products/')
      .then(
        res => {
          this.setState( prevState => {
            console.log(res.data);
            return prevState.products = res.data
          })
        }
      )
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <MainNavbar/>
          <h3>Products</h3>
            <form className="col-6 mx-auto">
              <div className="form-group">
                <h4>Add new product</h4>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" aria-describedby="name" placeholder="Enter product name"/>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" min="0.01" step="0.01" className="form-control" placeholder="price"/>
              </div>
              <div className="form-group">
                <label>Unit of Measure</label>
                <select className="form-control">
                  <option>-</option>
                  { SELECTION.map((value, index) => {
                    return (<option key={ index }>{ value }</option>);
                  }) }
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                  <button type="submit" className="btn btn-primary col">Submit</button>
                </div>
                <div className="form-group col-6">
                  <button type="button" className="btn btn-danger col">Close</button>
                </div>
              </div>
            </form>
          <table className="table table-dark">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">UoM</th>
              <th scope={ 'col' }> Price</th>
            </tr>
            </thead>
            <tbody>
            { this.state.products.map((value, index) => {
              return (
                <tr key={ index }>
                  <th>{ index }</th>
                  <td>{ value.name }</td>
                  <td>{ value.uom }</td>
                  <td>{ value.price }</td>
                </tr>);
            }) }
            </tbody>
          </table>
        </div>
    );
  };
}

export default Product;
