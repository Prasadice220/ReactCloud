import React from "react"
import './App.css'
import  {Container, Card, Button, Row, Col}  from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import querystring from 'querystring'
import RocketLaunchDetails from './components/RocketLaunchDetails'
import loader from './loadRocket.gif';
const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isLoaded: false,
      filter: {
        limit: 100,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined
      },
      
    }; 
  }
  getUpdatedApiUrl(filter = {}) {
    return API_BASE_URL + querystring.stringify({ ...filter });
    
  }
  fetchApi(filters){
     
      const URL = this.getUpdatedApiUrl(filters);
      console.log(URL)
      this.setState({ isLoaded: false, filter: filters});
    
      fetch(URL)
        .then(response => response.json())
        .then(data => {this.setState({isLoaded: true,data})})
    
  }
  componentDidMount() {
    this.fetchApi(this.state.filter);
  }

  stateUpdate(type, value) {
   
     if(this.state.filter[type] === value)
    {
      value = undefined
    }
    
  const filters ={...this.state.filter,[type] : value
 
  
     }
     
     this.fetchApi(filters)
}

  render() {
    console.log(this.state.filter[4])
    const { isLoaded, data } = this.state;
    const olaunch_year = new Array(16).fill(0).map((_,index) => 2006 + index )
    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }
    
    else {
    
    
  
    return (
      
    <div className="App">
    <h1>SpaceX Launch Programs</h1>
    
    <Container fluid>
    <Row>
              <Col xs={12} sm={12} md={6} lg={3}>
      <Card className="card">
      
        <Card.Body>
        <Card.Title className="header"><h3>filter</h3></Card.Title>
        <Card.Text className="App-filter-heading-launch-year">
                      Launch Year
                      <hr className="App-filter-hr" />
                    </Card.Text>
    <Row>
     <div className="button-con"> {
      olaunch_year.map((year) => {
      return(
        
      <Button 
      className="button"
      variant={this.state.filter.launch_year === year.toString()? "success" : "outline-success"}
     
      value={year}
      
      onClick={(e) => this.stateUpdate("launch_year", e.target.value)}
      >{year}</Button>)})

      
      
    }
  </div>
      
    
    </Row>
    <Card.Text className="App-filter-heading">
                      Successful Launch
                      <hr className="App-filter-hr" />
                    </Card.Text>

                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filter.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.stateUpdate(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filter.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.stateUpdate(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>

                    <Card.Text className="App-filter-heading">
                      Successful Landing
                      <hr className="App-filter-hr" />
                    </Card.Text>
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filter.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.stateUpdate("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filter.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.stateUpdate("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </Button>
                    </div>
    </Card.Body>
    </Card>
    </Col>
    <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {data.map((details) => {
                    return (
                      <Col md={12} lg={4}>
                        <RocketLaunchDetails details={details} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
    </Row>
    <div>
              <h5 className="App-Developers-name">
                Developed by : Prasad C Iyer
              </h5>
            </div>
  
    
    </Container>
        
    </div>
    )
   }           
  }
}
 

export default App;
