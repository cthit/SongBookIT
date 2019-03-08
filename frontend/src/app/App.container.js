import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import App from "./App";
import { DigitRedirectActions } from "@cthit/react-digit-components";
import { appLoadSongs } from "./App.action-creator";

const mapStateToProps = (state, ownProps) => ({
    tags: state.app.tags,
    songs: state.app.songs
});

const mapDispatchToProps = dispatch => ({
    redirectTo: to => dispatch(DigitRedirectActions.digitRedirectTo(to)),
    loadSongs: () => dispatch(appLoadSongs())
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
