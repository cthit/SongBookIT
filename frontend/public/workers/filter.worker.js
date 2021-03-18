
const filterTagsFunc = tags => {
    return song => song.tags.some(tag => tags.includes(tag));
};

const filterSearchFunc = search => {
    return song =>
        (song.title + song.number).toLowerCase().includes(search.toLowerCase());
};

const applyFilters = (songsToCheck, filters) => {
    if (filters.length) {
        return songsToCheck.filter(song => {
            return filters.map(func => func(song)).every(x => x);
        });
    } else {
        return songsToCheck;
    }
};

onmessage = function({data: {songs, filterText, filterTags}}) {

    const filters = [];

    if (filterTags.length) {
        filters.push(filterTagsFunc(filterTags));
    }
    if (filterText !== "") {
        filters.push(filterSearchFunc(filterText));
    }

    const filteredSongs = applyFilters(songs, filters)

    postMessage(filteredSongs);
}