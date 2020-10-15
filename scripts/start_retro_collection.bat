@ECHO OFF
ECHO Starting retro-collection...
cd "C:\work\React\galactic-core\retro-collection"
start cmd.exe /k "npm start"
cd api
pipenv run flask run
PAUSE

