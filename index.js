// Load required modules
const Snoowrap = require('snoowrap')
const request = require('request')

// Get core functions from other files
let client = require('./env.json')
const messages = require('./json/messages.json')
const list = require('./src/list.js')
const countries = require('./src/countries.js')

// Log in to Reddit
const username = client.username
client = new Snoowrap(client)

setInterval(function () {
  // Check inbox for 'u/bot-name'
  client.getUnreadMessages()
    .filter(element => element.subject === 'username mention')
    .forEach(element => {
      try {
        // Don't reply more than once
        client.markMessagesAsRead([element])

        // 'u/bot-name [INPUT]'
        const input = element.body.toLowerCase().split('u/' + username)[1].replace(/[^a-z]/g, '')
        console.log(element.author.name + ' requested ' + input)

        // Get date (yyyy-mm-dd) as a string
        let date = new Date()
        date = date.getFullYear() +
        '-' + String(date.getMonth() + 1).padStart(2, '0') +
        '-' + String(date.getDate()).padStart(2, '0')

        // Time to scrape, get ready if it doesn't work
        request('https://www.worldometers.info/coronavirus/', function (error, response, html) {
          let result = messages.requestError
          if (!error && response.statusCode) {
            // User gave input?
            if (/[a-z]/g.test(input)) {
              result = countries(html, input, date)
            } else {
              result = list(html, date)
            }
          }

          // Post the comment itself
          result += '\n\n' + messages.footer
          element.reply(result)
          console.log('Reply attempted')
        })

        // Should something go wrong
      } catch (error) {
        console.log('Error: ' + error)
      }
    })
}, 5000)
