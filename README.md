# cov-bot
cov-bot is a Reddit bot written in Node.js with [Snoowrap](https://github.com/not-an-aardvark/snoowrap) accessing global data regarding the COVID-19 pandemic.

## Usage
Comment on Reddit (use your own bot username if self-hosting):

`u/cov-bot` for a list of the top 30 countries by confirmed cases

`u/cov-bot <country>` for more specific stats on a certain country

## Installation
### Basic setup
Ensure that [Node.js](https://nodejs.org) is installed and execute these commands:
```
$ git clone https://github.com/forkpoweroutlet/cov-bot
$ cd cov-bot
$ npm install
```

### Reddit API
Go to reddit.com and create an account for your bot like any other Reddit account. Remember its username and password.

Now that you're logged in, head to your [app preferences](https://ssl.reddit.com/prefs/apps/). When creating an app, specify its name, description, and redirect URI (`http://localhost:8080` is fine), and tick the "Script" bubble. You can also add your personal Reddit account as a developer.

With the app created, take note of these credentials: ![App credentials](https://camo.githubusercontent.com/d85ccba28045ea28ca305e8825a90a2912fdbbe1/68747470733a2f2f692e696d6775722e636f6d2f515938787950432e706e67)
Then fill out an `env.json` in the main directory like so:
```
{
    "userAgent": "<BOT_USERNAME>",
    "clientId": "<CLIENT_ID>",
    "clientSecret": "<CLIENT_SECRET>",
    "username": "<BOT_USERNAME>",
    "password": "<BOT_PASSWORD>"
}
```
In the `cov-bot` folder, execute `$ npm dev` to start the bot.

## Contributing
### New Features
To request new features, [Open an issue](https://github.com/forkpoweroutlet/cov-bot/issues/new?labels=enhancement&template=feature_request.md). Pull requests are welcome, but be sure to open an issue before you [fork](https://github.com/forkpoweroutlet/cov-bot/fork) and open a pull request with your new code.

### Bugs
[Open an issue](https://github.com/forkpoweroutlet/cov-bot/issues/new?labels=bug&template=bug_report.md) using the bug report template.

## License
This project is licensed under the [MIT license](https://choosealicense.com/licenses/mit/).

༼ つ ◕_◕ ༽つ
