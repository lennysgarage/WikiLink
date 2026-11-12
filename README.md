# [WikiLink](https://tender-shaw-eff2a3.netlify.app/)

This project is the opposite of a URL "shortener".

We take in a URL and spit out a URL (usually longer) created using a random wikipedia article's contents.

The project is powered by a javascript frontend and backend, with MongoDB as the choice to store all the original and 'wikified' urls.

## Examples

Original URL: https://github.com/lennysgarage/WikiLink

Wikified URL: https://wikilink-backend.herokuapp.com/Peace-Arch-Entertainment--PAE-formerly-known-as-Medco-from-1981-until-1985-and-Vidatron-Entertainment-from-1985-until-1999-stylized-as-PEACE-ARCH-was-a-Canadian-motion-picture-and-television-production-company-based-in-Toronto-Ontario-Canada-with-offices-in-Los-Angeles-and-Vancouver-The-company-produced-and-acquired-feature-films-and-television-programs-for-worldwide-distribution-It-got-filed-for-bankruptcy-and-disestablished-in-2013-

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
