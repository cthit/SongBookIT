import { connect } from "react-redux";
import ShowAllSongs from "./ShowAllSongs";
import {
    appLoadCurrentSong,
    appLoadSongs
} from "./ShowAllSongs.action-creator";

const mapStateToProps = (state, ownProps) => ({
    songs: state.songsReducer.songs,
    currentSong: state.songsReducer.currentSong,
    tags: state.songsReducer.tags
});

const mapDispatchToProps = dispatch => ({
    loadSongs: () => dispatch(appLoadSongs()),
    loadCurrentSong: id => dispatch(appLoadCurrentSong(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowAllSongs);
