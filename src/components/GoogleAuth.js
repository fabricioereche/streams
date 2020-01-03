import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount(){
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
              clientId: "454983844292-pn0l6pajkttmf2lb7bv0bmk1cou1bn2e.apps.googleusercontent.com",
              scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onSigOutClick = ()=> {
        this.auth.signOut();
    };

    onSigInClick = () => {
        this.auth.signIn();
    };

    onAuthChange = (isSignedIn)=> {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut(this.auth.currentUser.get().getId());
        }
    };

    renderAuthButton(){

        if(this.props.isSignedIn === null){
            return null;
        }

        if(this.props.isSignedIn){
            return (
              <button
                className="ui red google button"
                onClick={this.onSigOutClick}
              >
                <i className="google icon"></i>Sign Out
              </button>
            );
        }

        return (
          <button
            className="ui green google button"
            onClick={this.onSigInClick}
          >
            <i className="google icon"></i>Sign In
          </button>
        );
    }
    
    render(){
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);