import { Row, Col, Container } from "react-bootstrap"
import {Hasil, ListCategories, NavbarComponent, Footer, Menus} from './components'
import React, { Component } from 'react'
import axios from "axios";
import './App.css';
import { API_URL } from './utils/constants'



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDipilih: 'Minuman'
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama="+this.state.categoryYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
    }

    changeCategory = (value) => {
      this.setState({
        categoryYangDipilih: value,
        menus: []
      })

    axios
    .get(API_URL + "products?category.nama="+value)
    .then((res) => {
      const menus = res.data;
      this.setState({ menus });
    })
    .catch((error) => {
      console.log(error);
    });
  }

render() {
  const { menus, categoriYangDipilih } = this.state;
  return (
    <div className="App">
      <NavbarComponent/>
      <div className="mt-3">
        <Container fluid>
          <Row>
          <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
          <Col>
          <h4><strong>Daftar Product</strong></h4>
          <hr/>
          <Row>
            {menus && menus.map((menu) => (
              <Menus
              key={menu.id}
              menu={menu}
                 />
            ))}
          </Row>
          </Col>
          <Hasil/>
          </Row>
        </Container>
        <Footer/>
      </div>
      </div>
  );
}
}