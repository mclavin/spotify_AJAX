/**
 * Created by Martin on 3/18/2017.
 */
var Module = (function(){
    let getArtistAndTracks = () => {
        let artist = document.getElementById("findArtist").value;

        let queryHits = $.ajax({
           url:  `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
           success: () => {
               console.log(queryHits);
               let artistId = queryHits.responseJSON.artists.items[0].id;
               document.getElementById("artistName").innerHTML = queryHits.responseJSON.artists.items[0].name;
               /**
                * MOAR GET
                * @type {string}
                */
               let findArtistsTopTracks = $.ajax({
                  url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=SE`,
                  success: () => {
                      let tracks = findArtistsTopTracks.responseJSON.tracks;
                      let trackList = document.getElementById("artistsTopTracks");
                      trackList.innerHTML = "";
                      for(let i = 0; i < tracks.length; i++){
                          let trackLi = document.createElement("li");
                          let trackNode = document.createTextNode(tracks[i].name);
                          trackLi.appendChild(trackNode);
                          trackList.appendChild(trackLi);
                      }
                   }
               });
           }
        });
        //let findArtistTopTracks = `https://api.spotify.com/v1/artists/1jBFgqfCh0pz5eNIWFvJGQ/top-tracks?country=SE`;
    }

    let artist = document.getElementById("artistButton").addEventListener("click", getArtistAndTracks);
})();