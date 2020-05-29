# cov-bot
cov-bot is a Reddit bot written in Node.js with [Snoowrap](https://github.com/not-an-aardvark/snoowrap) accessing global data regarding the COVID-19 pandemic.

## Usage
`u/cov-bot` for a list of the top 30 countries by confirmed cases

`u/cov-bot <country>` for more specific stats on a certain country

(use your own bot username if self-hosting)

## Installation
### Basic setup
Ensure that [Node.js](https://nodejs.org) is installed. Then, open command prompt or terminal and run these commands:
```
git clone https://github.com/forkpoweroutlet/cov-bot
cd cov-bot
npm install
```

### Reddit API
Go to reddit.com and create an account for your bot like any other Reddit account. Remember the username and password you entered.

Now that you're logged in, head to your [app preferences](https://ssl.reddit.com/prefs/apps/) and create a Reddit app as follows. Put in an app name, description, redirect URI (`http://localhost:8080` is fine), and tick the "Script" bubble. Feel free to add your main Reddit account as a developer while you're at it.

Once you've successfully created your app, take note of these credentials: ![App credentials](https://i.imgur.com/QY8xyPC.png)
Now, go back to the cloned repo and add the credentials to [env.json](https://github.com/forkpoweroutlet/cov-bot/blob/master/env.json) as shown there. 
In the `cov-bot` folder you cloned, execute the command `node index.js` and you should be good to go!

## Contributing
### Adding Info
Don't see your country listed in [health.json](https://github.com/forkpoweroutlet/cov-bot/blob/master/json/health.json)? Gather up this info:
- The country name (as it appears [here](https://worldometers.info/coronavirus), all caps)
- The name of the country's health authority (English and native language)
- A URL to both the native language version and the English version of the country's coronavirus homepage

Format it like below and submit a pull request.
```
"<COUNTRY>":"The <DEMONYM>" health authority is (the) [<AGENCY_ENGLISH>](<URL_ENGLISH>): (<AGENCY>)[<URL>]."
```
### New Features
Got an idea to make the bot more helpful? [Open an issue](https://github.com/forkpoweroutlet/cov-bot/issues/new) and let me know what you want to see added! Pull requests are welcome, but be sure to open an issue before you [fork](https://github.com/forkpoweroutlet/cov-bot/fork) this repository, write some code, and open a pull request.

### Bugs
Try to include, with as much relevant information as possible,
- What exactly went wrong
- How you got to this point, step-by-step
- What was supposed to happen if not for the bug
- Screenshots if necessary


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
