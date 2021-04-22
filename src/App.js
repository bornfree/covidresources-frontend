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

const DATA_URL = `//${process.env.REACT_APP_API_HOST}/data.json`;

class App extends React.Component {

  componentDidMount() {
    
    axios.get(DATA_URL)
      .then(res => {
        this.props.loadData(res.data);
      });

  }

  render() {
    
    return (
      <div className="App container-fluid pt-4">

        <div className="row">

          <div id="title-bar" className="col-12">
            <h5 className="text-center p-3 text-uppercase" style={{fontWeight: '600'}}>
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
                      <a href="https://forms.gle/e1WaRTS9MLHbYNEa6" target="_blank" className="btn btn-outline-danger rounded mx-4 btn-sm" rel="noreferrer">
                        Have a lead?
                      </a>

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
