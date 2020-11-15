// Load required modules
import cheerio from 'cheerio'

// Parse HTML
/**
 * Reuturn Markdown to comment
 * @param {string} html - HTML from Worldometers
 * @param {string} today - The date, yyyy-mm-dd
 */
export = async function (html: string, today: string) {

  const $ = cheerio.load(html)

  // Top part of message
  let result = 'COVID-19 Pandemic: **' + today + '**, top 30\n\n|**Area**|**Cases (total)**|**Cases (new)**|**Deaths (total)**|**Deaths (new)**|**Recovered (total)**|\n|:-|:-|:-|:-|:-|:-|\n'

  // Get the first 30 rows of table (ignore hidden rows)
  $('div#nav-today > div > table > tbody > tr').each(function (i, item) {
    const td = $(item).children()

    // First 30 non-hidden rows
    if ($(item).css('display') !== 'none' && i <= 37) {

      // |Country|Total Cases|New Cases|Total Deaths|New Deaths|Total Recovered|
      let mdline = ''
      for (let u = 1; u <= 6; u++) {
        mdline += '|' + td.eq(u).text()
      }
      mdline += '|'

      // Append formatted row
      result += mdline + '\n'
    }
  })

  return result
}
