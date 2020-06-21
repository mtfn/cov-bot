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
Go to reddit.com and create an account for your bot like any other Reddit account. Remember the username and password you entered.

Now that you're logged in, head to your [app preferences](https://ssl.reddit.com/prefs/apps/). When creating an app, specify its name, description, and redirect URI (`http://localhost:8080` is fine), and tick the "Script" bubble. You can also add your personal Reddit account as a developer.

With the app created, take note of these credentials: ![App credentials](https://camo.githubusercontent.com/d85ccba28045ea28ca305e8825a90a2912fdbbe1/68747470733a2f2f692e696d6775722e636f6d2f515938787950432e706e67)
Then fill out [env.json](https://github.com/forkpoweroutlet/cov-bot/blob/master/env.json) with those credentials.
In the `cov-bot` folder, execute `$ node index.js` to start the bot.

## Contributing
### Adding Info
If you don't see your country listed in [health.json](https://github.com/forkpoweroutlet/cov-bot/blob/master/json/health.json), gather up this info:
- The country name (as it appears [here](https://worldometers.info/coronavirus), all caps)
- The name of the country's health authority (English and native language)
- A URL to both the native language version and the English version of the country's coronavirus homepage

Format it like below and submit a pull request.
```
"<COUNTRY>":"The <DEMONYM>" health authority is (the) [<AGENCY_ENGLISH>](<URL_ENGLISH>): (<AGENCY>)[<URL>]."
```
### New Features
To request new features, [Open an issue](https://github.com/forkpoweroutlet/cov-bot/issues/new?labels=enhancement&template=feature_request.md). Pull requests are welcome, but be sure to open an issue before you [fork](https://github.com/forkpoweroutlet/cov-bot/fork) and open a pull request with your new code.

### Bugs
[Open an issue](https://github.com/forkpoweroutlet/cov-bot/issues/new?labels=bug&template=bug_report.md) using the bug report template.


## Credits
A big thank you to:
- [Worldometers](https://worldometers.info/coronavirus) for the data used
- [Glitch](https://glitch.com) for hosting this project
- [aceakash/string-similarity](https://github.com/aceakash/string-similarity)
- [Request](https://github.com/request/request) and [Cheerio](https://github.com/cheeriojs/cheerio), name a better duo
- Google Translate
- [EliteDaMyth](https://github.com/EliteDaMyth)'s Discord bot as a source of inspiration

## License
This project is licensed under the [MIT license](https://choosealicense.com/licenses/mit/).

༼ つ ◕_◕ ༽つ
