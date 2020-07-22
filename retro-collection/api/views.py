from flask import Blueprint, jsonify, request
from . import db
from .models import Game

main = Blueprint('main', __name__)

@main.route('/add_game', methods=['POST']) #entry point
def add_game():
    game_data = request.get_json()

    new_game = Game(title=game_data['title'], consoleId=game_data['consoleId'])

    db.session.add(new_game)
    db.session.commit()
    return 'Done', 201

@main.route('/games') #entry point
def games():
    game_list = Game.query.filter_by(consoleId='SNES') #return a SQLAlchemy object
    games = []

    for game in game_list:
        games.append({'id' : game.id, 'title' : game.title})

    return jsonify({'games' : games})
