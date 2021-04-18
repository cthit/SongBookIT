import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";
import { DigitIconButton } from "@cthit/react-digit-components";
import { deleteFavoriteSong } from "../../../../api/favourite-song/delete.favorite-song.api";
import { addFavoriteSong } from "../../../../api/favourite-song/put.favorite-song.api";

export const FavoriteStarButton = ({ favorite, song_id, refetch }) => {
    if (favorite) {
        return (
            <DigitIconButton
                primary
                icon={StarIcon}
                onClick={() => {
                    deleteFavoriteSong(song_id).then(() => {
                        refetch(song_id);
                    });
                }}
            />
        );
    } else {
        return (
            <DigitIconButton
                primary
                icon={StarBorderIcon}
                onClick={() => {
                    addFavoriteSong(song_id).then(() => {
                        refetch(song_id);
                    });
                }}
            />
        );
    }
};
