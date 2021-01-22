import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "943328379053-ips32arjoqq1pgcu1p4ar6ve8nns6sq4.apps.googleusercontent.com",
          scope: "email",
        })
        .then(
          () => {
            this.auth = window.gapi.auth2.getAuthInstance(); // gives access to auth methods
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
          },
          (err) => console.log(err)
        );
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    //this is a button event
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn === true) {
      return (
        <div>
          <button
            onClick={this.onSignOutClick}
            className="ui red google button"
          >
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon" />
            Sign In with Google
          </button>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
