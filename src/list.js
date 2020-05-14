// Load required modules
const cheerio = require('cheerio')
const messages = require('../json/messages.json')

// Parse HTML
module.exports = function (html, today) {
  const $ = cheerio.load(html)

  // Top part of message
  let result = 'COVID-19 Pandemic: **' + today + '**, top 30\n\n' + messages.listTable

  // Get the first 30 rows of table (ignore hidden rows)
  $('div#nav-today > div > table > tbody > tr').each(function (i, item) {
    const td = $(this).children()
    if ($(this).css('display') !== 'none' && i <= 37) {
      // |Country|Total Cases|New Cases|Total Deaths|New Deaths|Total Recovered|
      let mdline = ''
      for (let u = 0; u <= 5; u++) {
        mdline += '|' + td.eq(u).text()
      }
      mdline += '|'

      // Append formatted row
      result += mdline + '\n'
    }
  })

  return result
}
