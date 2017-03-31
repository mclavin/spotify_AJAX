/**
 * Created by Martin on 3/18/2017.
 */
var Module = (function(){
    /**
     * funktion som skall hämta artister
     */
    var error = document.getElementById("error");
    let getArtist = () => {
        /**
         * hämtar inputfält och listor
         * tömmer även listor/containers
         */
        let header = document.getElementById("header");
        header.innerHTML ="";

        let artist = document.getElementById("artistName").value;
        selectedArtist.innerHTML = "";
        error.innerHTML = "";

        let artistTrackList = document.getElementById("artistTopTracks");
        artistTrackList.innerHTML = "";
        let artistAlbumList = document.getElementById("artistAlbums");
        artistAlbumList.innerHTML = "";

        if(artist.length > 0){
            /**
             * 2 arrayer som ska fyllas med artistnamn respektive ID
             */
            let artistIdArr = [];
            let artistNameArr = [];
            /**
             * request som returnerar artistobjekt via Spotify Web API
             */
            var artistRes = $.ajax({
                url:  `https://api.spotify.com/v1/search?q=artist:${artist}&type=artist`,
                statusCode: {
                    404: () => {
                        alert("source not found!");
                    }
                },
                /**
                 * om requestet lyckas kallar vi på funktion som prinar ut lista med artister
                 */
                success: () => {
                    printArtists(artistIdArr, artistNameArr, artistRes);
                }
            })
        }
        else{
            errorFunc();
        }
    }
    /**
     * funktion som printar ut artister
     */
    var printArtists = (artistIdArr, artistNameArr, artistRes) => {
        /**
         * hämtar div för att hålla artister och en array med artister i objektet
         * tömmer diven så att gamsla sökresultat inte ligger kvar
         */
        let artists = artistRes.responseJSON.artists.items;
        let artistList = document.getElementById("artistList");
        artistList.innerHTML = "";
        console.log(artists);
        /**
         * loopar genom artistarray som vi hämtade tidigare
         * skriver ut namn, bild, och skapar en div för varje artist
         */
        for(let i = 0; i < artists.length; i++){
            let artistDiv = document.createElement("div");
            artistDiv.setAttribute("id", "artistDiv");
            artistList.appendChild(artistDiv);
            let artistImg = document.createElement("img");
            artistImg.setAttribute("class", "artistImage");
            if(artists[i].images.length == 0){
                artistImg.src = "img/unknownArtist.png"
            }
            else{
                artistImg.src = artists[i].images[1].url;
            }
            artistImg.addEventListener("click", printSelectedArtist);
            artistDiv.appendChild(artistImg);
            let artistName = document.createTextNode(artists[i].name);
            let artistLink = document.createElement("a");
            artistLink.href = artists[i].external_urls.spotify;
            let artistNode = document.createElement("h3");
            artistLink.appendChild(artistName);
            artistNode.appendChild(artistLink);
            artistDiv.appendChild(artistNode);
            artistNameArr.push(artistName);
            artistIdArr.push(artists[i].id);
        }
        /**
         * funktion för att printa vald artist
         */
        function printSelectedArtist () {
            /**
             * hämtar div som skall vald artist
             * sätter innerHTML till den valda bildens (this) förälders innerHTML
             * tömmer även listan med artiser
             */
            artistList.innerHTML = "";
            let selectedArtist = document.getElementById("selectedArtist");
            selectedArtist.innerHTML = this.parentNode.innerHTML;
            let artistTrackList = document.getElementById("artistTopTracks");

            let artistAlbumList = document.getElementById("artistAlbums");


            /**
             * loopar genom alla artistnamn som vi har sparat i en av våra arrayer
             * om ett namn i arrayen är likadant som bildens (this) nextSibling gör vi ett request
             */
            for(let i = 0; i < artistNameArr.length; i++){
                if(artistNameArr[i].nodeValue === this.nextSibling.children[0].innerHTML){
                    this.setAttribute("id", "selectedImg");
                    console.log(this);
                    let artistId = artistIdArr[i];

                    /**
                     * ajaxrequest till Spotify Web API som hämtar låtar via artistID
                     */
                    let findArtistsTopTracks = $.ajax({
                        url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=SE`,
                        statusCode: {
                            404: () => {
                            alert("source not found!");
                            }
                        },
                        success: () => {
                            /**
                             * kallar på funktion som printar ut vald artists låtar
                             */
                            printArtistTracks(findArtistsTopTracks, artistTrackList);
                        }
                    })
                    /**
                     * ajaxrequest till Spotify Web API som hämtar album via artistID
                     */
                    let findArtistAlbums = $.ajax({
                        url: `https://api.spotify.com/v1/artists/${artistId}/albums?market=SE&album_type=album`,
                        statusCode: {
                            404: () => {
                            alert("source not found!");
                            }
                        },
                        success: () => {
                            /**
                             * kallar på funktion som printar ut vald artists album
                             */
                            printArtistAlbums(findArtistAlbums, artistAlbumList);
                        }
                    })
                }
            }
        }
    }

    /**
     * funktionen som skriver ut vald artists låtar
     */
    let printArtistTracks = (findArtistsTopTracks, artistTrackList) => {
        //sparar låtarna i trakcs
        let tracks = findArtistsTopTracks.responseJSON.tracks;

        /**
         * loopar genom alla tracks som vi får från API:t, max 10st som default
         * skapar länk, labal och li för varje låt
         */
        for(let i = 0; i < tracks.length; i++){
            let trackLink = document.createElement("a");
            trackLink.href = tracks[i].external_urls.spotify;
            let trackLi = document.createElement("li");
            let trackNode = document.createTextNode(tracks[i].name);
            trackLink.appendChild(trackNode);
            trackLi.appendChild(trackLink);
            artistTrackList.appendChild(trackLi);
        }
    }

    /**
     * funktionen som skriver ut vald artists album
     */
    let printArtistAlbums = (findArtistAlbums, artistAlbumList) => {
        //sparar alla albums i albums
        let albums = findArtistAlbums.responseJSON.items;

        /**
         * loopar genom alla album som vi får från API:t
         * skapar länk, labal och li för varje album
         */
        for(let i = 0; i < albums.length; i++){
            let albumNode = document.createTextNode(albums[i].name);
            let albumLi = document.createElement("li");
            let albumLink = document.createElement("a");
            albumLink.href = albums[i].external_urls.spotify;
            albumLink.appendChild(albumNode);
            albumLi.appendChild(albumLink);
            artistAlbumList.appendChild(albumLi);
        }
    }

    /**
     * funktion som hämtar album via låt, namn eller artist
     */
    let getAlbum = () => {
        error.innerHTML = "";
        let header = document.getElementById("header");
        header.innerHTML ="";
        //hämtar användarsträng
        let album = document.getElementById("albumName").value;

        if(album.length > 0) {

            /**
             * request till Spotify Web API som hämtar album baserat på användaren sträng
             */
            let albumRes = $.ajax({
                url: `https://api.spotify.com/v1/search?q=${album}&type=album`,
                statusCode: {
                    404: () => {
                    alert("source not found!");
                    }
                },
                /**
                 * om requestet lyckas kallar vå på funktion som skriver
                 * ut album beroende på användarens input
                 */
                success: () => {
                    printAlbums(albumRes);
                }
            })
        }
        else{
            errorFunc();
        }
    }

    /**
     * funktionen som skriver ut albumen
     */
    let printAlbums = (albumRes) => {
        /**
         * hämtar listan som vi ska mata in album i
         * ser till att den är tom så gamla album inte ligger kvar
         */
        let albumList = document.getElementById("albumList");
        albumList.innerHTML = "";
        /**
         * sparar alla album vi får tillbaka i albums
         * loopa genom albums
         * skapar en div för varje album och lägger bild och albumnamn i den
         */
        let albums = albumRes.responseJSON.albums.items;
        for (let i = 0; i < albums.length; i++) {
            let albumDiv = document.createElement("div");
            albumDiv.setAttribute("class", "albumDiv");
            let albumImage = document.createElement("img");
            albumImage.src = albums[i].images[0].url;
            albumImage.setAttribute("class", "albumImage");
            let albumLink = document.createElement("a");
            albumLink.href = albums[i].external_urls.spotify;
            let albumL = document.createElement("label");
            let albumName;
            if(albums[i].name.length > 27){
                albumName = document.createTextNode(albums[i].name.substring(0, 27));
            }
            else{
                albumName = document.createTextNode(albums[i].name);
            }
            albumL.appendChild(albumName);
            albumLink.appendChild(albumImage);
            albumDiv.appendChild(albumLink);
            albumDiv.appendChild(albumL);
            albumList.appendChild(albumDiv);
        }
    }

    /**
     * funktion som körs när användaren söker efter låt
     */
    let getTracks = () => {
        error.innerHTML = "";
        let header = document.getElementById("header");
        header.innerHTML ="";
        //hämtar användarsträng
        let track = document.getElementById("trackName").value;
        let trackDiv = document.getElementById("trackDiv");
        trackDiv.innerHTML = "";

        if(track.length > 0) {
            /**
             * request till Spotify Web API som hämtar album baserat på användarens input
             */
            let trackRes = $.ajax({
                beforeSend: () => {
                    let loading = document.createElement("img");
                    loading.setAttribute("id", "loading");
                    loading.src = "img/loading.gif";
                    trackDiv.appendChild(loading);
                },
                url: `https://api.spotify.com/v1/search?q=${track}&limit=50&type=track`,
                /**
                 * om requestet lyckas kallar vi på funktion som skriver ut låtar efter
                 * användarens input
                 */
                 statusCode: {
                     404: () => {
                        alert("source not found!");
                     }
                 },
                success: () => {
                    printTracks(trackRes, trackDiv);
                },
                complete: () => {
                    let trackDiv = document.getElementById("trackDiv");
                    trackDiv.removeChild(trackDiv.children[0]);
                }
            })
        }
        else{
            errorFunc();
        }
    }

    /**
     * funktionen som skriver ut låtarna
     */
    let printTracks = (trackRes, trackDiv) => {

        /**
         * hämtar listan som vi ska mata in låtar i
         * ser till att den är tom så gamla låtar inte ligger kvar
         */
        let trackList = document.createElement("ol");
        trackList.setAttribute("class", "trackList");
        trackList.setAttribute("id", "trackList");
        trackList.innerHTML = "";

        /**
         * sparar alla låtar vi får tillbaka i tracks
         * loopa genom tracks
         * skapar en div för varje låt som innehåller låt och artist
         */
        let tracks = trackRes.responseJSON.tracks.items;
        for (let i = 0; i < tracks.length; i++) {

            let trackLi = document.createElement("li");
            let trackLink = document.createElement("a");
            trackLink.href = tracks[i].external_urls.spotify;
            let trackL = document.createElement("label");
            let trackName = document.createTextNode(tracks[i].name);
            let artistLink = document.createElement("a");
            artistLink.href = tracks[i].artists[0].external_urls.spotify;
            let artistL = document.createElement("label");
            let artistName = document.createTextNode(tracks[i].artists[0].name);
            let trackContainer = document.createElement("div");
            trackContainer.setAttribute("id", "trackContainer");
            trackLink.appendChild(trackName);
            trackL.appendChild(trackLink);
            trackContainer.appendChild(trackL);
            artistLink.appendChild(artistName);
            artistL.appendChild(artistLink);
            trackContainer.appendChild(artistL);
            trackLi.appendChild(trackContainer);
            trackList.appendChild(trackLi);
        }
        trackDiv.appendChild(trackList);
    }

    /**
     * funktion som körs om användaren söker på ett tomt sökfält
     */
    let errorFunc = () => {
        let errorPara = document.createElement("p");
        let errorText = document.createTextNode("Mata in något i fältet innan du söker");
        errorPara.appendChild(errorText);
        error.appendChild(errorPara);
    }

    document.getElementById("artistButton").addEventListener("click", getArtist);
    document.getElementById("albumButton").addEventListener("click", getAlbum);
    document.getElementById("trackButton").addEventListener("click", getTracks);
})();