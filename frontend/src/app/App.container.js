import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "./App";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
// finns ifall ni vill göra något med historik, ta bort mo ni glömt bort den
