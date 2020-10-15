from . import db

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    consoleId = db.Column(db.String(50), db.ForeignKey('console.id'))
    text = db.Column(db.Text, nullable=False, default="")

class Console(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(50))
    active = db.Column(db.Boolean)
