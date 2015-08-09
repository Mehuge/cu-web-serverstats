# Camelot Unchained Game Server Stats

Displays the game score and kill counts for the current game of capture the ducks.

## Installation

    git clone https://github.com/Mehuge/cu-web-serverstats
    cd cu-web-serverstats
    npm install
    gulp
  
## Testing

    http://localhost:9000/
  
## Deployment

Copy the contents of the dist folder to your web server.  Either uses as-is with index.html 
or include serverstats.css and main.js and Cinzel font in your existing page and define a 
div id="server-stats-container" that will contain the content.  Use index.html as reference.
