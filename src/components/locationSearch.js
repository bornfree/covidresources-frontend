import React from 'react';
import { connect } from 'react-redux';
import { selectLocation } from '../redux/actions';

class LocationSearch extends React.Component {


  render() {
    
    return (
      <div className="col-10 offset-1 shadow p-1 mb-3 bg-body rounded">

        <select className="form-select border-0" value={this.props.selectedLocation} onChange={(e) => { this.props.selectLocation(e.target.value) } } placeholder='Select Location' >

            <option selected> Select Location </option>          

            { this.props.locations.map(location => {
                return (
                    <option value={location} key={location}  >{location}</option>
                )
            })}
            
        </select>

      </div>
    );

  }

}

function mapStateToProps(state){
    return {
        locations: state.locations,
        selectedLocation: state.selectedLocation
    }
  }
  
export default connect(
mapStateToProps,
{ selectLocation }
)(LocationSearch);