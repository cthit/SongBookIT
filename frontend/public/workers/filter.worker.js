importScripts("https://rawgit.com/farzher/fuzzysort/master/fuzzysort.js");

onmessage = function({ data: { songs, filterText, filterTags } }) {
    let target = songs;

    if (filterTags.length) {
        target = songs.filter(song =>
            song.tags.some(tag => filterTags.includes(tag))
        );
    }

    let filteredSongs = [];

    if (filterText === "") {
        filteredSongs = target;
    } else {
        target = target.map(s => ({ ...s, number: "" + s.number }));

        const res = fuzzysort.go(filterText, target, {
            keys: ["number", "title", "melody", "author", "text"],
            allowTypo: false,
            threshold: -500
        });

        filteredSongs = res.map(r => r.obj);
    }

    postMessage(filteredSongs);
};
