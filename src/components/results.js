import React from 'react';
import {connect} from 'react-redux';
import {vote} from '../redux/actions';
import { toast } from 'react-toastify';

class Result extends React.Component {

  constructor(props) {
    super(props);

    this.phoneLinkRef = React.createRef();
    this.handleCall = this.handleCall.bind(this);
  }

  handleCall() {
    
    toast.dark("Connecting... Please don't forget to upvote/downvote after your call");
      
    setTimeout(() => {
      this.phoneLinkRef.current.click();
    }, 3000);
  }

  render() {

    return (

      <div className="d-flex bg-light rounded p-2 mb-1 mx-3">
      
        <div style={{width: '80%'}}>
          <h3>
            {this.props.result.name}
          </h3>
          <p>
            {this.props.result.description}
          </p>

          <p onClick={this.handleCall} className="text-primary">
            <i className="fas fa-phone me-2 "></i>
            {this.props.result.contact}
          </p>

          <a className="d-none" ref={this.phoneLinkRef} href={`tel:${this.props.result.contact}`}>
          
          </a>
        </div>

        <div style={{width: '20%'}} className="d-flex">
          <i className="far fa-thumbs-up fs-3 flex-fill p-2 my-2 text-success" onClick={(e) => { this.props.vote(this.props.result.id, 'up') } }></i>
          <i className="far fa-thumbs-down fs-3 flex-fill p-2 my-2 text-muted" onClick={(e) => { this.props.vote(this.props.result.id, 'down') } }></i>
        </div>

      </div>
      
    );

  }

}

class Results extends React.Component {


  render() {
    
    return (
      <div className="col-12 my-2 p-2">

        { this.props.results.map( (result,i) => {
          
          return (
            <Result key={i} result={result} vote={this.props.vote} />
          )

        }) }

      </div>
    );

  }

}

function mapStateToProps(state){
    return {
        results: state.results
    }
}
  
export default connect(
mapStateToProps,
{vote}
)(Results);