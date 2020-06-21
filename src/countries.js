// Load required modules
const cheerio = require('cheerio')
const stringSimilarity = require('string-similarity')
const messages = require('../json/messages.json')
const healthInfo = require('../json/health.json')

//  Rounded percentages
function divide (num, den) {
  const quo = num / den
  if (isNaN(quo) || quo === 0) {
    return '0%'
  } else if (quo < 0.0005) {
    return '≈0%'
  } else {
    return (Math.round(1000 * quo) / 10).toString() + '%'
  }
}

// Parse HTML
module.exports = function (html, input, today) {
  const $ = cheerio.load(html); let obj = {}; let result = messages.requestError

  $('div#nav-today > div > table > tbody > tr').each(function (i, element) {
    if ($(this).css('display') !== 'none') {
      const td = $(this).children()

      // {country: [cases, new cases, deaths, new deaths, recoveries, active, serious, cases/1m]}
      const arr = []
      for (let i = 2; i <= 10; i++) {
        if(i !== 7) {
          arr.push(td.eq(i).text().replace(/\s/g, ''))
        }
      }
      obj[td.eq(1).text().toLowerCase()] = arr
    }
  })

  // Compare obj to user input, select best match
  const bestMatch = stringSimilarity.findBestMatch(input.toLowerCase(), Object.keys(obj)).bestMatch
  if (bestMatch.rating >= 0.35) {
    obj = obj[bestMatch.target]
    const country = bestMatch.target.toUpperCase()

    // Do table formatting
    result = 'COVID-19 Pandemic in **' + country + '**: **' + today + '**\n\n' + messages.countryTable
    for (let i = 0; i <= 6; i++) {
      result += '|' + obj[i]
    }
    result += '|\n\n'

    // Clean up all the numbers so we can do math
    obj = obj.map(x => parseFloat(x.replace(/[^0-9.]/g, '')))

    // Format percentage calculations for markdown
    result += 'Based on this data, we can *approximate* the following:\n\n- Out of all confirmed cases in this area, **' +
        divide(obj[4], obj[0]) + '** have recovered and **' +
        divide(obj[2], obj[0]) + '** have died.' + '\n- **' +
        divide(obj[5], obj[0]) + '** of all confirmed cases are currently infected, **' +
        divide(obj[6], obj[5]) + '** of whom seriously or critically.' + '\n- So far today there has been a **' +
        divide(obj[1], obj[0]) + '** increase in total confirmed cases, and the overall death toll has risen by **' +
        divide(obj[3], obj[2]) + '**.' + '\n- Compared to population, there are **' +
        obj[7].toString() + '** cases per million people.'

    // Link the country's health authority if possible
    if (healthInfo[country] !== undefined) { result += '\n\n' + healthInfo[country] }

    // Make final adjustments
    result += '\n\n' + messages.countryFooter
  } else {
    result = messages.countryNotFound
  }
  return result
}
