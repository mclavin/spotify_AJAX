/**
 * Created by Martin on 3/18/2017.
 * kalla på annan function utanför success instället för att skriva
 * all kod i success
 */
var Module = (function(){
    let getArtistAndTracks = () => {
        let artist = document.getElementById("findArtist").value;

        let queryHits = $.ajax({
           url:  `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
           success: () => {
               console.log(queryHits);
               let artistId = queryHits.responseJSON.artists.items[0].id;
               let artistDiv = document.getElementById("theArtist");
               artistDiv.innerHTML = "";

               let artistName = document.createElement("h3");
               let artistNode = document.createTextNode(queryHits.responseJSON.artists.items[0].name);
               artistName.appendChild(artistNode);
               artistDiv.appendChild(artistName);

               let img = document.createElement("img");
               img.setAttribute("class", "artistImage");
               img.src = queryHits.responseJSON.artists.items[0].images[1].url;
               artistDiv.appendChild(img);

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
                          let trackLink = document.createElement("a");
                          console.log(tracks[i]);
                          trackLink.href = tracks[i].uri;
                          let trackLi = document.createElement("li");
                          let trackNode = document.createTextNode(tracks[i].name);
                          trackLink.appendChild(trackNode);
                          trackLi.appendChild(trackLink);
                          trackList.appendChild(trackLi);
                      }
                   }
               });

               let findArtistAlbums = $.ajax({
                   url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
                   success: function () {
                       console.log(findArtistAlbums);
                       let albumList = document.getElementById("artistsAlbums");
                       albumList.innerHTML = "";
                       for(let i = 0; i < findArtistAlbums.responseJSON.items.length; i++){
                           let albumNode = document.createTextNode(findArtistAlbums.responseJSON.items[i].name);
                           let albumLi = document.createElement("li");
                           let albumLink = document.createElement("a");
                           albumLink.href = findArtistAlbums.responseJSON.items[i].uri;

                           albumLink.appendChild(albumNode);
                           albumLi.appendChild(albumLink);
                           albumList.appendChild(albumLi);
                       }
                   }
               })


           }
        });
        //let findArtistTopTracks = `https://api.spotify.com/v1/artists/1jBFgqfCh0pz5eNIWFvJGQ/top-tracks?country=SE`;
    }

    let artist = document.getElementById("artistButton").addEventListener("click", getArtistAndTracks);
})();