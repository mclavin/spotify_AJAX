/**
 * Created by Martin on 3/18/2017.
 */
var Module = (function(){

    let artist = document.getElementById("artistButton");

    let getArtist = () => {
        var toPrint = "tja";
        printArtist(toPrint);
    }
    artist.addEventListener("click", getArtist);
    let printArtist = (toPrint) => {
        console.log(toPrint);
    }

})();