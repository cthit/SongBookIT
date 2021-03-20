import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import { getSongs } from "../../api/songs/get.songs.api";
import { getTags } from "../../api/tags/get.tags.api";

const SongTagContext = createContext({});

export const SongTagProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetching, setRefetching] = useState(0);

    const refetchSongsAndTags = useCallback(async () => {
        setRefetching(r => r + 1);
        try {
            const res = await getSongs();
            const songs = Object.values(res.data.data.songs).sort(
                (a, b) => a.number - b.number
            );
            const tags = Object.values(res.data.data.tags).sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setSongs(songs);
            setTags(tags);
        } catch (e) {
            setError(e);
        }
        setRefetching(r => r - 1);
    }, []);

    const refetchTags = useCallback(async () => {
        setRefetching(r => r + 1);
        try {
            const res = await getTags();
            const tags = Object.values(res.data.data.tags).sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setTags(tags);
        } catch (e) {
            setError(e);
        }
        setRefetching(r => r - 1);
    }, []);

    const getSong = useCallback(
        id => {
            const song = songs.find(song => song.song_id === id);
            if (song) {
                const t = tags.filter(tag => song.tags.includes(tag.tag_id));
                return { ...song, tags: t };
            }
            return null;
        },
        [songs, tags]
    );

    useEffect(() => {
        const func = async () => {
            await refetchSongsAndTags();
            setLoading(false);
        };

        func();
    }, []);

    return (
        <SongTagContext.Provider
            value={{
                songs,
                tags,
                loading,
                error,
                refetching: refetching > 0,
                refetchSongsAndTags,
                refetchTags,
                getSong
            }}
        >
            {children}
        </SongTagContext.Provider>
    );
};
export const useSongs = () => useContext(SongTagContext);
