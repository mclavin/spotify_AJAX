# AJAX Assignment - Open APIs

### Martin Clavin
### Kurs: JavaScript 2
### Utbildning: Frontend-utveckling, Nackademin

## Länk till projekt
[https://mclavin.github.io/spotify_AJAX/](https://mclavin.github.io/spotify_AJAX/)

## Beskrivning

I applikationen kan användare söka på artister, album och låtar i Spotifys bibliotek
med hjälp utav Spotify Web API. Användaren får tillbaka en lista med artister, album
eller låtar beroende på hur specifik anvädaren är innan requestet skickas.
Exempelvis om användaren söker på artist och bara skriver "the" kommer listan
vara längre än om ett helt artist- eller gruppnamn hade angivits


Syftet med projektet var att bygga en fungerande webbapplikation som hanterar data med AJAX requests

## Följande tekniker har använts i projektet

* HTML
* CSS
* JavaScript
* jQuery AJAX-anrop
* Spotify Web API

## APIt

Med Spotify Web API kan man hämta metadata om artister, låtar och album.
Datan kommer ganska stora jsonobject beroende på hur specifik man är i sitt
anrop.

[Till APIt](https://developer.spotify.com/web-api/)

## Tankar kring projektet

Den fas som tog mest tid i projektet var att välja och läsa om olika API.
När jag väl valde ett API var arbetsflödet relativt smidigt ända till slut.
Viss funktionalitet kom jag på under projektets gång, vilket kunde ställa till
med små problem ibland.

Det som skulle kunna förbättrats i koden är att ha en funktion som skriver ut
artister, album och låtar. Inte en för varje.

Hade jag haft mer tid, eller kanske kommit igång med kodning lite tidigare hade
jag velat använda mig utav ännu ett API från Spotify som skulle göra det möjligt att
spela låtsnuttar direkt på sidan.