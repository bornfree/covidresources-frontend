import React from 'react';
import {connect} from 'react-redux';
import { selectCategory } from '../redux/actions';

class CategorySearch extends React.Component {


    render() {
    
        return (
          <div className="col-10 offset-1 mb-2 shadow p-1 mb-5 bg-body rounded">
    
            <select className="form-select border-0" value={this.props.selectedCategory} onChange={(e) => { this.props.selectCategory(e.target.value) } }>

                <option selected> Select Category </option>

                { this.props.categories.map(category => {
                    return (
                        <option value={category} key={category}  >{category}</option>
                    )
                })}
                
            </select>
    
          </div>
        );
    
      }
    
    }
    
function mapStateToProps(state){
    return {
        categories: state.categories,
        selectedCategory: state.selectedCategory
    }
}
    
export default connect(
mapStateToProps,
{ selectCategory }
)(CategorySearch);
