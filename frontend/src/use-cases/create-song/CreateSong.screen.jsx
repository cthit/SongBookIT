import React, { useEffect, useState } from "react";
import {
    DigitEditDataCard,
    DigitTextField,
    DigitTextArea,
    DigitAutocompleteSelectMultiple,
} from "@cthit/react-digit-components";
import { getTags } from "../../api/tags/get.tags.api";
import { addSong } from "../../api/songs/post.songs.api";
import * as yup from "yup";

const CreateSong = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getTags().then(res => {
            setTags(
                Object.values(res.data.Tag)
                    .map(tag => {
                        return { text: tag.name, value: tag.tag_id };
                    })
                    .sort((a, b) => (a.text > b.text ? 1 : -1))
            );
        });
    }, []);

    return (
        <DigitEditDataCard
            hasButtons
            onSubmit={(values, actions) => {
                console.log(values);
                addSong(values);
                actions.resetForm();
            }}
            initialValues={{
                title: "",
                author: "Unknown",
                melody: "Unknown",
                text: "",
                tags: [],
            }}
            validationSchema={yup.object().shape({
                title: yup.string().required("This can't be empty"),
                author: yup.string().required("This can't be empty"),
                melody: yup.string().required("This can't be empty"),
                text: yup.string().required("This can't be empty"),
            })}
            titleText={"Create a song"}
            submitText={"Submit"}
            keysOrder={["title", "author", "melody", "text", "tags"]}
            keysComponentData={{
                title: {
                    component: DigitTextField,
                    componentProps: {
                        upperLabel: "Title",
                    },
                },
                author: {
                    component: DigitTextField,
                    componentProps: {
                        upperLabel: "Author",
                    },
                },
                melody: {
                    component: DigitTextField,
                    componentProps: {
                        upperLabel: "Melody",
                    },
                },
                text: {
                    component: DigitTextArea,
                    componentProps: {
                        primary: true,
                        upperLabel: "Text",
                    },
                },
                tags: {
                    component: DigitAutocompleteSelectMultiple,
                    componentProps: {
                        upperLabel: "Filter the songs by tags",
                        options: tags,
                    },
                },
            }}
            submitButton={{
                text: "Skicka",
            }}
        />
    );
};

export default CreateSong;
