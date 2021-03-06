import React from 'react';
import axios from 'axios';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {connect} from 'react-redux';
import { loadData } from './redux/actions';

import LocationSearch from './components/locationSearch';
import CategorySearch from './components/categorySearch';
import Results from './components/results';
import tawkTo from "tawkto-react";
import logo from './logo.png'


const DATA_URL = `//${process.env.REACT_APP_API_HOST}/data.json`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLinks: false
    };
  }

  componentDidMount() {
    
    axios.get(DATA_URL)
      .then(res => {
        this.props.loadData(res.data);
      });

      tawkTo(process.env.REACT_APP_TAWK_TO_PROPERTY_ID, process.env.REACT_APP_TAWK_TO_KEY);

  }

  showLinks() {
    this.setState({
      showLinks: ! this.state.showLinks
    });
  }

  render() {
    
    return (
      <div className="App container-fluid p-0">

          <div className="text-center bg-danger p-2 d-none">
            <p className="text-light m-0">
              Only dummy data available at the moment
            </p>

          </div>

        <div className="row mt-3">

          <div id="title-bar" className="col-12">
            <h5 className="text-center p-3 text-uppercase" style={{fontWeight: '600'}}>
              <img src={logo} width="15px" className="me-2" />
              <span className="text-primary">
              COVID 
              </span>  
              Resources
            </h5>
            <p className="text-muted text-center">
              Search for Covid-related resources
            </p>

            
            
          </div>

          { this.props.data?
              <React.Fragment>
              
                    <LocationSearch />
                    <CategorySearch />
        
                    <Results/>
        
                    <div className="col-8 offset-2 text-center">
                      <a href="//covidresources.in/submit-a-lead" target="_blank" className="btn btn-outline-danger rounded mx-4 btn-sm" rel="noreferrer">
                        Have a lead?
                      </a>
                      <br/>
                      <button className="btn btn-outline-primary mt-4" onClick={ ()  => {this.showLinks()}}>
                        Bed availability links
                      </button>

                      {this.state.showLinks? 
                        <ul className="list-unstyled">

                        <li className="mt-2">
                          <a href="http://bbmpgov.com/">
                            Bangalore
                          </a>
                        </li>
                        
                        <li className="mt-2">

                          <a href="https://ahna.org.in/covid19.html">
                            Ahmedabad
                          </a>
                        </li>
                        
                        <li className="mt-2">  
                          <a href="https://www.wbhealth.gov.in/pages/corona/bed_availability">
                            West Bengal
                          </a>
                        </li>
                        
                        <li className="mt-2">  
                          <a href="https://dshm.delhi.gov.in/mis/(S(qch2dlqroo14wcu0yeljvhtt))/Private/frmFreeBedMonitoringReport.aspx">
                            Delhi
                          </a>
                        </li>
                        
                        <li className="mt-2">
                          <a href="https://covidggn.com/public/pages/gurugram-hospitals">
                            Gurgaon
                          </a>
                         </li> 

                        </ul>
                      : null}

                    </div>
                    
              </React.Fragment>
        
        
          :
          <h3> Loading... </h3>
          }          


        </div>

        <ToastContainer position="bottom-center" />
        

      </div>
    );

  }

}

function mapStateToProps(state){
  return {
      data: state.data
  }
}
  
export default connect(
  mapStateToProps,
  { loadData }
)(App);
