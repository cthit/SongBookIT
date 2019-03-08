import { connect } from "react-redux";
import ShowAllSongs from "./ShowAllSongs";

const mapStateToProps = (state, ownProps) => ({
    songs: state.app.songs
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowAllSongs);
