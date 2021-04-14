import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";

export const FavouriteStar = ({ favourite }) => {
    const starColor = "gray";
    if (favourite) {
        return <StarIcon style={{ color: starColor }} />;
    } else {
        return <StarBorderIcon style={{ color: starColor }} />;
    }
};
