# [WikiLink](https://tender-shaw-eff2a3.netlify.app/)

This project is the opposite of a url "shortener".

We take in a url and spit out a url (usually longer) created using a random wikipedia article's contents.

The project is powered by a javascript frontend and backend, with MongoDB as the choice to store all the original and 'wikified' urls.

## Examples

Original URL: https://github.com/lennysgarage/WikiLink

Wikified URL: https://wikilink-backend.herokuapp.com/Michel-Ange-Houasse--Paris-1680--Arpajon-1730-was-a-French-painter-most-of-whose-career-was-spent-at-the-court-of-Philip-V-of-Spain-who-summoned-him-to-the-court-in-Madrid-in-1715-whilst-he-was-still-Philip-of-Anjou-Michel-Ange-had-already-trained-in-the-studio-of-his-father-Ren-Antoine-Houasse-Michel-Ange-produced-many-portraits-of-the-Spanish-royal-family-including-ones-of-the-future-king-Louis-I-He-introduced-Spain-to-mythological-and-rural-scenes-he-had-learned-from-Flemish-Baroque-art-His-taste-for-pastoral-and-bucolic-genre-scenes-resulted-in-paintings-such-as-Blind-man-s-buff--in-Spanish-La-gallina-ciega-clearly-influenced-by-Watteau-and-itself-a-clear-influence-on-Goya-s-oil-on-linen-cartoon-of-the-same-name-In-his-later-years-he-came-into-friction-over-works-for-the-royal-court-with-his-fellow-French-artist-Jean-Ranc-

</br>

<!---
Original URL: https://wikifylink.me/

Wikified URL: https://wikilink-backend.herokuapp.com/Warham-may-refer-to-n-PlacesWarham-Herefordshire-England-Warham-Norfolk-EnglandPeopleJoe-Warham--English-rugby-league-footballer-coach-and-administrator-John-Warham--New-Zealand-ornithologist-William-Warham--1450-1532-Archbishop-of-Canterbury-William-Warham--Archdeacon-of-Canterbury-c-1480--1557-nephew-of-the-Archbishop-of-CanterburyCompaniesThornewill-and-Warham--an-English-engineering-company--1849-1929-
-->

It's pretty fun to mess around and get all different kind of links.

## Notes

The project is being run using netlify as the frontend with automatic push to deploy.

The project is using a Heroku free dyno, so on startup the site may take a few seconds to respond.

## Getting Started
To install the required dependencies
```
cd api
npm i 
cd client
npm i
```

In api/
```
create a .env file & insert
MONGO_URI=<mongodb_uri>
```
In client/
```
echo "NODE_ENV=development" > .env
```

Lastly open a terminal for /api & execute
```
npm start
```
And open a terminal for /client & execute
```
npm start
```
Now you can visit localhost:3000 and test out your own url "extender"
