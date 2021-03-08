import React, {useEffect, useState} from "react";
import {DigitIconButton, DigitLoading} from "@cthit/react-digit-components";
import {getTags} from "../../../api/tags/get.tags.api";
import {
    ColumnContainer,
    TopRightButton,
    WideCenterContainer
} from "../../../common-ui/design/Common.styles";
import {ArrowBackRounded} from "@material-ui/icons";
import {useHistory, useParams} from "react-router-dom";
import {ErrorTextCard} from "../../../common/elements/Error";
import {getSong} from "../../../api/songs/get.songs.api";
import useAdmin from "../../../common/hooks/use-admin";
import InsufficientAccess from "../../../common/views/InsufficientAccess";
import EditSongForm from "./views/EditSongForm.view";

const EditSong = () => {
    let history = useHistory();
    let {song_id} = useParams();
    const [tags, setTags] = useState([]);
    const [song, setSong] = useState({
        song_id: "",
        title: "",
        melody: "",
        text: "",
        author: "",
        tags: []
    });
    const [hasLoadedSong, setHasLoadedSong] = useState(false);
    const [hasLoadedTag, setHasLoadedTag] = useState(false);
    const [loadSongError, setLoadSongError] = useState({
        isError: false,
        message: ""
    });

    useEffect(() => {
        getTags()
            .then(res => {
                const tags = Object.values(res.data.data.tags);
                setTags(
                    tags
                        .map(tag => {
                            return {text: tag.name, value: tag.tag_id};
                        })
                        .sort((a, b) => (a.text > b.text ? 1 : -1))
                );
                setHasLoadedTag(true);
            })
            .catch();
    }, []);

    useEffect(() => {
        getSong(song_id)
            .then(res => {
                setSong(res.data.data.song);
                setHasLoadedSong(true);
            })
            .catch(err => {
                setLoadSongError(err.response.data.error);
                setHasLoadedSong(false);
            });
    }, [song_id]);

    const admin = useAdmin();

    if (!admin) {
        return <InsufficientAccess/>;
    }

    return (
        <ColumnContainer>
            <TopRightButton>
                <DigitIconButton
                    icon={ArrowBackRounded}
                    primary
                    raised
                    onClick={() => history.goBack()}
                />
            </TopRightButton>
            <WideCenterContainer>
                {loadSongError.isError && (
                    <ErrorTextCard message={loadSongError.message}/>
                )}
                {hasLoadedSong && hasLoadedTag ? (
                    <EditSongForm tags={tags} song={song}/>
                ) : loadSongError ? (
                    <div/>
                ) : (
                    <DigitLoading/>
                )}
            </WideCenterContainer>
        </ColumnContainer>
    );
};

export default EditSong;
