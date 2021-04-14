import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";
import { DigitIconButton } from "@cthit/react-digit-components";
import { deleteFavouriteSong } from "../../../../api/favourite-song/delete.favourite-song.api";
import { addFavouriteSong } from "../../../../api/favourite-song/put.favourite-song.api";

export const FavouriteStarButton = ({ favourite, song_id, refetch }) => {
    if (favourite) {
        return (
            <DigitIconButton
                primary
                icon={StarIcon}
                onClick={() => {
                    deleteFavouriteSong(song_id).then(() => {
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
                    addFavouriteSong(song_id).then(() => {
                        refetch(song_id);
                    });
                }}
            />
        );
    }
};
