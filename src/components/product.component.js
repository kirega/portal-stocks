import React, { PureComponent } from "react";
import MainNavbar from "./navbar.component";
import axios from 'axios';

const SELECTION = ['KG', 'UNIT', 'PKT'];
var product = {};

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.getProducts = this.getProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleUomChange = this.handleUomChange.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.addProduct =  this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);

    this.state = {
      products: [],
      show: false,
      initialForm: {
        id:'',
        name: '',
        uom: '',
        price: '',
      },
      add: false,
      edit: false,
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('https://prox-stock.herokuapp.com/products/')
      .then(
        res => {
          this.setState(prevState => {
            return prevState.products = res.data
          })
        }
      )
      .catch(err => {
        console.log(err)
      })
  };

  createProduct(e) {
    e.preventDefault();
    const { initialForm } = this.state;
    if (Object.keys(initialForm).length > 0) {
      console.log(initialForm);
      axios.post(`https://prox-stock.herokuapp.com/products/`, initialForm).then(
        (res) => {
          this.getProducts();
        }
      )
    } else {
      return;
    }
  }

  deleteProduct(id) {
    axios.delete(`https://prox-stock.herokuapp.com/products/${ id }`).then(
      () => {
        this.getProducts();
      }
    );
  };
  updateProduct(e) {
    e.preventDefault();
    const {initialForm} = this.state;
    axios.put(`https://prox-stock.herokuapp.com/products/${ initialForm.id }`, initialForm).then(
      () => {
        this.getProducts();
      }
    );
  }
  editProduct(product) {
    const { edit }= this.state;
    this.setState({edit: !edit, initialForm:product});
  }
  addProduct (){
    const { add }= this.state;
    this.setState({add: !add});
  }

  handleNameChange(e) {
    let value = e.target.value;
    this.setState(prevState => ({
        initialForm:
          { ...prevState.initialForm, name: value }
      })
    )
  }

  handlePriceChange(e) {
    let value = e.target.value;
    this.setState(prevState => ({
        initialForm:
          { ...prevState.initialForm, price: value }
      })
    )
  }

  handleUomChange(e) {
    let value = e.target.value;
    this.setState(prevState => ({
        initialForm:
          { ...prevState.initialForm, uom: value }
      })
    )
  };

  render() {
    const { initialForm, add, edit } = this.state;
    return (
      <div>
        <MainNavbar/>
        <div className="container">
          <div className="row justify-content-around align-content-end mt-2">
            <div className="col-6">
              <h3>Products</h3>
            </div>
            <div className="col-2">
              <button className="btn btn-primary" onClick={this.addProduct}>{add ? "Hide": "Add Product" }</button>
            </div>
          </div>
          {
            add ?
              <form className="col-6 mx-auto" onSubmit={ this.createProduct }>
                <div className="form-group">
                  <h4>Add new product</h4>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text"
                         className="form-control"
                         name="name"
                         value={ initialForm.name }
                         aria-describedby="name"
                         required
                         onChange={ this.handleNameChange }
                         placeholder="Enter product name"/>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number"
                         value={ initialForm.price }
                         required min="0.01"
                         step="0.01"
                         name="price"
                         onChange={ this.handlePriceChange }
                         className="form-control"
                         placeholder="price"/>
                </div>
                <div className="form-group">
                  <label>Unit of Measure</label>
                  <select name="uom" className="form-control" value={ initialForm.uom }
                          onChange={ this.handleUomChange }
                          required>
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
                    <button type="button" className="btn btn-danger col" onClick={this.addProduct}>Close</button>
                  </div>
                </div>
              </form>
              : ''
          }

          { this.state.products.length === 0 ?
            <div> No products exist Yet </div> :
            <table className="table table-dark">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">UoM</th>
                <th scope={ 'col' }> Price</th>
                <th scope={ 'col' }>Action</th>
              </tr>
              </thead>
              <tbody>
              { this.state.products.map((value, index) => {
                return (
                  <tr key={ index + 1 }>
                    <th>{ index + 1 }</th>
                    <td>{ value.name }</td>
                    <td>{ value.uom }</td>
                    <td>{ value.price }</td>
                    <td>
                      <button className="btn btn-primary mr-2" onClick={ () => this.editProduct(value) }> Edit
                      </button>
                      <button className="btn btn-danger" onClick={ () => this.deleteProduct(value.id) }>delete</button>
                    </td>
                  </tr>);
              }) }
              </tbody>
            </table>
          }
          {
            edit ?
              <form className="col-6 mx-auto" onSubmit={this.updateProduct}>
                <div className="form-group">
                  <h4>Edit product</h4>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text"
                         className="form-control"
                         name="name"
                         value={ initialForm.name }
                         aria-describedby="name"
                         required
                         onChange={ this.handleNameChange }
                         placeholder="Enter product name"/>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number"
                         value={ initialForm.price }
                         required min="0.01"
                         step="0.01"
                         name="price"
                         onChange={ this.handlePriceChange }
                         className="form-control"
                         placeholder="price"/>
                </div>
                <div className="form-group">
                  <label>Unit of Measure</label>
                  <select name="uom" className="form-control" value={ initialForm.uom }
                          onChange={ this.handleUomChange }
                          required>
                    <option>-</option>
                    { SELECTION.map((value, index) => {
                      return (<option key={ index }>{ value }</option>);
                    }) }
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <button type="submit" className="btn btn-primary col" >Update</button>
                  </div>
                  <div className="form-group col-6">
                    <button type="button" className="btn btn-danger col" onClick={this.editProduct}>Close</button>
                  </div>
                </div>
              </form>
              : ''
          }
        </div>
      </div>
    );
  };
}

export default Product;
