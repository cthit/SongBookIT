import { connect } from "react-redux";
import ShowAllSongs from "./ShowAllSongs";
import { appLoadCurrentSong } from "./ShowAllSongs.action-creator";

const mapStateToProps = (state, ownProps) => ({
    songs: state.app.songs,
    currentSong: state.app.currentSong
});

const mapDispatchToProps = dispatch => ({
    loadCurrentSong: id => dispatch(appLoadCurrentSong(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowAllSongs);
