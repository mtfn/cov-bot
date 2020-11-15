// Load required modules
import Snoowrap from 'snoowrap'
import got from 'got'

// Get core functions from other files
let client = require('./env.json')
import list  from './list'
import countries from './countries'

// Log in to Reddit
const username = client.username
client = new Snoowrap(client)

/**
 * Replies to bot username mention
 * @param string input - A country
 */
async function draftComment(input: string) {

  let result = 'I seem to have encountered an error, try again later or contact u/forkpoweroutlet'

  // Get date (yyyy-mm-dd) as a string
  const date = new Date()
  
  const iso8601 = date.getFullYear() +
  '-' + String(date.getMonth() + 1).padStart(2, '0') +
  '-' + String(date.getDate()).padStart(2, '0')

  // Time to scrape, get ready if it doesn't work
  try {
    const html = (await got('https://worldometers.info/coronavirus/')).body

    // User gave input
    if (/[a-z]/g.test(input)) {
      result = await countries(html, input, iso8601)

    // User did not give input
    } else {
      result = await list(html, iso8601)
    }

  } catch(error) {
    console.error(error)
  }

  // Make comment
  result += '\n\n^(Beep boop; I\'m a bot. This action was requested by another user.) [^(Data)](https://www.worldometers.info/coronavirus/) ^(|) [^(GitHub)](https://github.com/forkpoweroutlet/cov-bot)'
  return result

}


setInterval(async function () {
  
  // Grab our inbox from Reddit
  const inbox = await client.getUnreadMessages()

  // Username mentions
  inbox.filter((x: Snoowrap.PrivateMessage) => x.subject === 'username mention')
  .forEach(async (x: Snoowrap.Comment) => {
      
    try {
      // 'u/bot-name [INPUT]'
      const input = x.body.toLowerCase().split('u/' + username)[1].replace(/[^a-z]/g, '')
      console.log(x.author.name + ' requested ' + input)
      x.reply(await draftComment(input))

    } catch(error) {
      console.error(error)
    }
  })

  // Don't reply again
  if(inbox.length > 0) {
    await client.markMessagesAsRead(inbox)
  }
  
}, 5000)
