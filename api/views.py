from flask import Blueprint, jsonify, request
from . import db
from .models import Game
from .models import Console
#from .crawler.crawler.spiders.games import GamesSpider

main = Blueprint('main', __name__)

@main.route('/add_game', methods=['POST']) #entry point
def add_game():
    game_data = request.get_json()

    print("add_game[post] title = ", game_data['title'] ,"consoleId = ", game_data['consoleId'])
    #process data, TO DO: check valid console id
    new_game = Game(title=game_data['title'], consoleId=game_data['consoleId'].upper(), text="")

    db.session.add(new_game)
    db.session.commit()
    return 'Done', 201

@main.route('/update_game', methods=['POST']) #entry point
def update_game():
    game_data = request.get_json()
    print("update_game[post] id= ", game_data['id'], "title = ", game_data['title'] ,"consoleId = ", game_data['consoleId'], "text = ", game_data['text'])

    game_record = Game.query.filter_by(id=game_data['id']).first() #return a SQLAlchemy object
    game_record.title = game_data['title']
    game_record.text = game_data['text']

    db.session.commit()
    return 'Done', 201

@main.route('/delete_game', methods=['POST']) #entry point
def delete_game():
    game_data = request.get_json()
    print("delete_game[post] id= ", game_data['id'])

    game_record = Game.query.filter_by(id=game_data['id']).first() #return a SQLAlchemy object

    db.session.delete(game_record)
    db.session.commit()
    return 'Done', 201

@main.route('/games/<consoleId>', methods=["GET"]) #entry point
def games(consoleId):

    print("games[get] consoleId = ", consoleId.upper())
    game_list = Game.query.filter_by(consoleId=consoleId.upper()) #return a SQLAlchemy object
    games = []

    for game in game_list:
        games.append({'id' : game.id, 'title' : game.title, 'consoleId' : game.consoleId, 'text' : game.text})

    return jsonify({'games' : games})

#ExampleURL: /games/snes?game=1. Used as a heavy read to return more information
@main.route('/games/<consoleId>?game=<gameId>', methods=["GET"]) #entry point
def game(consoleId, gameId):

    print("game[get] gameId = ", gameId.upper())
    game_record = Game.query.filter_by(id=gameId).first() #return a SQLAlchemy object
    game = {'id' : game_record.id, 'title' : game_record.title, 'consoleId' : game_record.consoleId, 'text' : game_record.text}

    return jsonify({'game' : game})


@main.route('/games/<consoleId>/current-price', methods=["GET"]) #entry point
def currentPrice(consoleId):
    gameTitle = request.args.get('game', default = "", type = str)
    print("/games/<consoleId>/current-price gameTitle=", gameTitle)

    #GamesSpider.run()

    return jsonify({'price': 20.00})

@main.route('/consoles', methods=["GET"]) #entry point
def consoles():
    console_list = Console.query.filter_by(active=True) #return a SQLAlchemy object
    consoles = []

    for console in console_list:
        consoles.append({'id' : console.id, 'name' : console.name})

    return jsonify({'consoles' : consoles})
