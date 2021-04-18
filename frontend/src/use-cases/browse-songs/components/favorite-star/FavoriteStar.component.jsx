import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";

export const FavoriteStar = ({ favorite }) => {
    const starColor = "gray";
    if (favorite) {
        return <StarIcon style={{ color: starColor }} />;
    } else {
        return <StarBorderIcon style={{ color: starColor }} />;
    }
};
