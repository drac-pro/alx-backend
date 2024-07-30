#!/usr/bin/env python3
"""sets up a simple flask app"""
from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config:
    """config for simple flask app"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


def get_user():
    """retrieves a User based on their id"""
    login_id = request.args.get('login_as')
    if login_id:
        return users.get(int(login_id), None)


@app.before_request
def before_request():
    """executes before all other functions"""
    g.user = get_user()


@babel.localeselector
def get_locale():
    """determines the best match with our supported languages"""
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    locale = request.headers.get('locale', '')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """index route"""
    return render_template('6-index.html')


if __name__ == '__main__':
    app.run()
