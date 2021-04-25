import React from 'react';
import {connect} from 'react-redux';
import {vote} from '../redux/actions';
import { toast } from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Result extends React.Component {

  constructor(props) {
    super(props);

    this.phoneLinkRef = React.createRef();
    this.handleCall = this.handleCall.bind(this);
    this.getShareText = this.getShareText.bind(this);
  }

  handleCall() {
    
    toast.dark("Connecting... Please don't forget to upvote/downvote after your call");
      
    setTimeout(() => {
      this.phoneLinkRef.current.click();
    }, 3000);
  }

  getShareText() {
    let text = `
Location: ${this.props.location}
Category: ${this.props.category}

${this.props.result.name}
${this.props.result.description}
${this.props.result.contact}
${this.props.url}/${this.props.result.id}
    `;

    return text;
  }

  handleCopy() {
    toast.dark("Info copied");
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

          <p className="text-success">
            Verified at: {this.props.result.lastVerified}
          </p>

          <p className="text-success">
            Availability: {this.props.result.stock}
          </p>
          
          <CopyToClipboard text={this.getShareText()} onCopy={() => this.handleCopy()}>
            <p className="text-muted">
              <i className="fas fa-share-alt me-2"></i>
              Share
            </p>
          </CopyToClipboard>

          
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

    let urlFragment = `${window.location.protocol}//${window.location.host}/${this.props.selectedLocation}/${this.props.selectedCategory}`;
    
    return (
      <div className="col-12 my-2 p-2">

        { this.props.results.map( (result,i) => {
          
          return (
            <Result key={i} result={result} vote={this.props.vote} url={urlFragment} location={this.props.selectedLocation} category={this.props.selectedCategory} />
          )

        }) }

        { this.props.results.length < 1 && this.props.selectedCategory.trim().length > 0?
          <div className="text-center p-5 m-5">
            <p>No results found</p>
            <p className="text-muted">
              Please check back later 
              <br/>
              Volunteers are continuously adding leads
            </p>
          </div>
        : null}

      </div>
    );

  }

}

function mapStateToProps(state){
    return {
        selectedLocation: state.selectedLocation,
        selectedCategory: state.selectedCategory,
        results: state.results
    }
}
  
export default connect(
mapStateToProps,
{vote}
)(Results);