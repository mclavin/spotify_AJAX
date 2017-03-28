/**
 * Created by Martin on 3/18/2017.
 * kalla på annan function utanför success instället för att skriva
 * all kod i success
 */
var Module = (function(){
    let getArtist = () => {
        let artist = document.getElementById("artistName").value;
        let trackList = document.getElementById("artistsTopTracks");
        selectedArtist.innerHTML = "";
        trackList.innerHTML = "";
        let albumList = document.getElementById("artistsAlbums");
        albumList.innerHTML = "";
        let artistRes = $.ajax({
            url:  `https://api.spotify.com/v1/search?q=artist:${artist}&type=artist`,
            success: () => {

                let artists = artistRes.responseJSON.artists.items;
                let artistList = document.getElementById("artistList");
                artistList.innerHTML = "";

                var artistIdArr = [];
                var artistNameArr = [];

                for(let i = 0; i < artists.length; i++){
                    let artistDiv = document.createElement("div");
                    artistDiv.setAttribute("id", "artistDiv");
                    artistList.appendChild(artistDiv);

                    let artistImg = document.createElement("img");
                    artistImg.setAttribute("class", "artistImage");
                    artistImg.src = artists[i].images[1].url;
                    artistImg.addEventListener("click", printArtistStuff);
                    artistDiv.appendChild(artistImg);

                    let artistName = document.createTextNode(artists[i].name);
                    let artistNode = document.createElement("h3");
                    artistNode.appendChild(artistName);
                    artistDiv.appendChild(artistNode);

                    artistNameArr.push(artistName);
                    artistIdArr.push(artists[i].id);
                }

                function printArtistStuff () {
                    let selectedArtist = document.getElementById("selectedArtist");
                    selectedArtist.innerHTML = this.parentNode.innerHTML;
                    artistList.innerHTML = "";


                    for(let i = 0; i < artistNameArr.length; i++){
                        //console.log(this.nextSibling.innerHTML);
                        //console.log(artistNameArr[i].nodeValue);
                        if(artistNameArr[i].nodeValue === this.nextSibling.innerHTML){
                            let artistId = artistIdArr[i];

                            let findArtistsTopTracks = $.ajax({
                                url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=SE`,
                                success: () => {
                                    let tracks = findArtistsTopTracks.responseJSON.tracks;
                                    trackList.innerHTML = "";
                                    for(let i = 0; i < tracks.length; i++){
                                        let trackLink = document.createElement("a");
                                        console.log(tracks[i]);
                                        trackLink.href = tracks[i].external_urls.spotify;
                                        let trackLi = document.createElement("li");
                                        let trackNode = document.createTextNode(tracks[i].name);
                                        trackLink.appendChild(trackNode);
                                        trackLi.appendChild(trackLink);
                                        trackList.appendChild(trackLi);
                                    }
                                }
                            });

                            let findArtistAlbums = $.ajax({
                                url: `https://api.spotify.com/v1/artists/${artistId}/albums?market=SE&album_type=album`,
                                success: function () {
                                    console.log(findArtistAlbums);
                                    for(let i = 0; i < findArtistAlbums.responseJSON.items.length; i++){
                                        let albumNode = document.createTextNode(findArtistAlbums.responseJSON.items[i].name);
                                        let albumLi = document.createElement("li");
                                        let albumLink = document.createElement("a");
                                        albumLink.href = findArtistAlbums.responseJSON.items[i].external_urls.spotify;

                                        albumLink.appendChild(albumNode);
                                        albumLi.appendChild(albumLink);
                                        albumList.appendChild(albumLi);
                                    }
                                }
                            });
                        }

                    }
                }

            }
        });
    }

    let getAlbum = () => {
        let album = document.getElementById("albumName").value;

        let albumRes = $.ajax({
            url: `https://api.spotify.com/v1/search?q=${album}&type=album`,
            success: function () {
                let albumList = document.getElementById("albumList");
                albumList.innerHTML = "";
                for(let i = 0; i < albumRes.responseJSON.albums.items.length; i++){
                    let albumId = albumRes.responseJSON.albums.items[i].id;

                    let albumDiv = document.createElement("div");
                    albumDiv.setAttribute("class", "albumDiv");
                    let albumImage = document.createElement("img");
                    albumImage.src = albumRes.responseJSON.albums.items[i].images[0].url;
                    albumImage.setAttribute("class", "albumImage");
                    let albumLink = document.createElement("a");
                    albumLink.href = albumRes.responseJSON.albums.items[i].external_urls.spotify;

                    let albumL = document.createElement("label");
                    let albumName = document.createTextNode(albumRes.responseJSON.albums.items[i].name);

                    albumL.appendChild(albumName);
                    albumLink.appendChild(albumImage);
                    albumDiv.appendChild(albumLink);
                    albumDiv.appendChild(albumL);
                    albumList.appendChild(albumDiv);

                }

            }
        });
    }

    let getTracks = () => {
        let track = document.getElementById("trackName").value;

        let trackRes = $.ajax({
            url: `https://api.spotify.com/v1/search?q=${track}&limit=50&type=track`,
            success: function () {
                let tracks = trackRes.responseJSON.tracks.items;
                let trackList = document.getElementById("trackList");
                trackList.innerHTML = "";

                for (let i = 0; i < tracks.length; i++){
                    let trackLi = document.createElement("li");

                    let trackLink = document.createElement("a");
                    trackLink.href = tracks[i].external_urls.spotify;

                    let trackL = document.createElement("label");
                    let trackName = document.createTextNode(tracks[i].name);

                    let artistL = document.createElement("label");
                    let artistName = document.createTextNode(tracks[i].artists[0].name);

                    let trackContainer = document.createElement("div");
                    trackContainer.setAttribute("id", "trackContainer");

                    trackL.appendChild(trackName);
                    trackLink.appendChild(trackL);
                    trackContainer.appendChild(trackLink);
                    artistL.appendChild(artistName);
                    trackContainer.appendChild(artistL);
                    trackLi.appendChild(trackContainer);
                    trackList.appendChild(trackLi);

                }
            }
        })
    }

    let artist = document.getElementById("artistButton").addEventListener("click", getArtist);
    let album = document.getElementById("albumButton").addEventListener("click", getAlbum);
    let track = document.getElementById("trackButton").addEventListener("click", getTracks);
})();