import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";




export default class packingtrasport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      driverschedul: [],
      vehicleschedule: [],
    };
  }
  componentDidMount() {
    this.getdriver();
     this.getvehicle();
  }

  getdriver() {
    axios
      .get("http://localhost:8000/driverschedul/Driverschedule")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            driverschedul: res.data.existingPosts,
          });
          console.log(this.state.driverschedul);
        }
      });
  }

  filterData(driverschedul, searchresult) {
    const result = driverschedul.filter(
      (driverschedul) =>
        driverschedul.name.toLowerCase().includes(searchresult) ||
        driverschedul.nic.toLowerCase().includes(searchresult)
    );

    this.setState({ driverschedul: result });
  }

  handlesearch = (e) => {
    const searchresult = e.currentTarget.value;
    axios
      .get("http://localhost:8000/driverschedul/Driverschedule")
      .then((res) => {
        if (res.data.success) {
          this.filterData(res.data.existingPosts, searchresult);
        }
      });
  };

 

  getvehicle() {
    axios
      .get("http://localhost:8000/vehicleschedule/VehicleSchedule")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            vehicleschedule: res.data.existingPosts,
          });
          console.log(this.state.vehicleschedule);
        }
      });
  }

 
 

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     driver: [],
  //   };
  // }
  // componentDidMount() {
  //   this.getdriver();
  // }
  // getdriver() {
  //   axios.get("http://localhost:8000/driver/DriHome").then((res) => {
  //     if (res.data.success) {
  //       this.setState({
  //         driver: res.data.existingPosts,
  //       });
  //       console.log(this.state.driver);
  //     }
  //   });
  // }

  // filterData(driver, searchresult) {
  //   const result = driver.filter(
  //     (driver) =>
  //       driver.name.toLowerCase().includes(searchresult) ||
  //       //driver.age.toLowerCase().includes(searchresult)||
  //       driver.nic.toLowerCase().includes(searchresult) ||
  //       driver.address.toLowerCase().includes(searchresult)
  //   );

  //   this.setState({ driver: result });
  // }

  // handlesearch = (e) => {
  //   const searchresult = e.currentTarget.value;
  //   axios.get("http://localhost:8000/driver/DriHome").then((res) => {
  //     if (res.data.success) {
  //       this.filterData(res.data.existingPosts, searchresult);
  //     }
  //   });
  // };

  render() {
    return (
      <div id="wrapper" className="toggled">
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row justify-content-start ">
              <div className="col-8 ">
                <h1
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px",
                    textAlign: "center",
                    opacity: ".50",
                  }}
                >
                  Driver Schedule
                </h1>

                <div
                  className="d-grid gap-2 d-md-flex justify-content-md-end"
                  role="group"
                  aria-label="Basic example"
                >
                  <button type="button" className="btn btn-warning">
                    <a
                      href="/DriHome"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <i className="fas fa-user-tie"></i>Driver List
                    </a>
                  </button>
                  <button type="button" className="btn btn-success">
                    <a
                      href="/TMSDash"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <i className="fas fa-home"></i>Home
                    </a>
                  </button>
                </div>

                <div className="col-lg-3 mt-2 mb-2">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="search"
                    name="search"
                    onChange={this.handlesearch}
                  ></input>
                </div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Driver Name</th>

                      <th scope="col">NIC </th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.driverschedul.map((driverschedul, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{driverschedul.name} </td>

                        <td>{driverschedul.nic}</td>

                        <td>
                          <a
                            className="btn btn-danger"
                            href="#"
                            onClick={() => this.onDelete(driverschedul._id)}
                          >
                            <i className="fas fa-trash-alt"></i>Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h1
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px",
                    textAlign: "center",
                    opacity: ".50",
                  }}
                >
                  Vehicle Schedule
                </h1>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Registration NO</th>

                      <th scope="col">Brand Name </th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.vehicleschedule.map(
                      (vehicleschedule, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{vehicleschedule.regno} </td>

                          <td>{vehicleschedule.brandname}</td>

                          <td>
                            <a
                              className="btn btn-danger"
                              href="#"
                              onClick={() => this.onDelete(vehicleschedule._id)}
                            >
                              <i className="fas fa-trash-alt"></i>Delete
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
