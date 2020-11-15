// Load required modules
import cheerio from 'cheerio'
import stringSimilarity from 'string-similarity'

//  Rounded percentages
function divide (num: number, den: number) {
  const quo = num / den
  if (isNaN(quo) || quo === 0) {
    return '0%'
  } else if (quo < 0.0005) {
    return '≈0%'
  } else {
    return (Math.round(1000 * quo) / 10).toString() + '%'
  }
}

/**
 * Return Markdown to comment
 * @param {string} html - HTML from Worldometers
 * @param {string} input - A country name from the summoning Reddit comment
 * @param {string} today - The date, yyyy-mm-dd
 */
export = async function (html: string, input: string, today: string) {
  const $ = cheerio.load(html)
  let result = 'I seem to have encountered an error, try again later or contact u/forkpoweroutlet'

  /* Store country name, numerical data, and similarity to user input
  We also want a bias of 0.35 */
  let obj: {
    country: string,
    data: string[],
    rating: number
  } = {
    country: '',
    data: [],
    rating: 0.35
  }

  // Move through the visible table rows
  $('div#nav-today > div > table > tbody > tr').each(function (i, element) {
    if ($(element).css('display') !== 'none') {
      const td = $(element).children()

      // Current table row
      const thisCountry = td.eq(1).text().toLowerCase()
      const thisRating = stringSimilarity.compareTwoStrings(input, thisCountry)

      if(thisRating > obj.rating) {
        // {country: [cases, new cases, deaths, new deaths, recoveries, active, serious, cases/1m]}
        const thisData = []
        for (let i = 2; i <= 10; i++) {
          if(i !== 7) {
            thisData.push(td.eq(i).text().replace(/\s/g, ''))
          }
        }

        obj.country = thisCountry;
        obj.data = thisData;
        obj.rating = thisRating;
        
      }
    }
  })

  // Did anything make it through our filter?
  if (obj.data.length === 8) {

    // Go into CAPS in end result
    obj.country = obj.country.toUpperCase()

    // Do table formatting
    result = 'COVID-19 Pandemic in **' + obj.country + '**: **' + today + '**\n\n|**Cases (total)**|**Cases (new)**|**Deaths (total)**|**Deaths (new)**|**Recoveries**|**Active Cases**|**Serious Cases**|\n|:-|:-|:-|:-|:-|:-|:-|\n'
    for (let i = 0; i <= 6; i++) {
      result += '|' + obj.data[i]
    }
    result += '|\n\n'

    // Clean up all the numbers so we can do math
    const numbers = obj.data.map(x => parseFloat(x.replace(/[^0-9.]/g, '')))

    // Format percentage calculations for markdown
    result += 'Based on this data, we can *approximate* the following:\n\n- Out of all confirmed cases in this area, **' +
        divide(numbers[4], numbers[0]) + '** have recovered and **' +
        divide(numbers[2], numbers[0]) + '** have died.' + '\n- **' +
        divide(numbers[5], numbers[0]) + '** of all confirmed cases are currently infected, **' +
        divide(numbers[6], numbers[5]) + '** of whom seriously or critically.' + '\n- So far today there has been a **' +
        divide(numbers[1], numbers[0]) + '** increase in total confirmed cases, and the overall death toll has risen by **' +
        divide(numbers[3], numbers[2]) + '**.' + '\n- Compared to population, there are **' +
        numbers[7].toString() + '** cases per million people.'

    // Make final adjustments
    result += '\n\nNot the answers you\'re looking for? Sorry! Try querying a country based on the data page.'

  // If nothing matched input well
  } else {
    result = 'Sorry, I couldn\'t find that country! Here are some possible solutions:\n\n- This country has not confirmed any COVID-19 cases.\n- If you are querying the USA, UK, UAE, DRC, or CAR, try abbreviating it as such.\n- Check the data page below and enter the country name as it as it appears there.\n'
  }

  // Send the message over to index.js
  return result
}
