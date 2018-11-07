const fetch = require('node-fetch')
const request = require('request')
const fs = require('fs')
const snakeCase = require('just-snake-case')
const logger = require('./lib/logger')


let counter = 0
const maxNumberOfPictures = 20
const folder = './downloads/'
const subreddit = 'pictures'
const sort = 'top'
const t = 'month'

function download(url, filename, callback) {
  request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
};

async function fetchInfo(subreddit, sort, t, number) {
  try {
    const JSONresponse = await fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?t=${t}`)
    const parsedResponse = await JSONresponse.json()
    let picturesInfo = await parsedResponse.data.children.slice(0, number + 1)

    filteredPicturesInfo = picturesInfo.map(w => ({
      title: w.data.title,
      url: w.data.preview.images[0].source.url // Hi-res picture is the first image of array
    }))

    // Escape urls and format titles
    formattedPicturesInfo = filteredPicturesInfo.map(w => ({
      url: w.url.replace('&amp;', '&s').replace('webp&ss', 'webp&s'),
      title: `${snakeCase(w.title)}.jpg`
    }))

    return formattedPicturesInfo

  } catch (error) {
    console.error(error)
  }
}
// function fetchInfo(subreddit, sort, t, number) {
//   return fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?t=${t}`)
//     .then(res => res.json())
//     .then(res => res.data.children.slice(0, number + 1))
//     // Hi-res picture is the first of the images array
//     .then(posts => posts.map(p => ({title: p.data.title, url: p.data.preview.images[0].source.url})))
//     // Escape &amp; for &s and webp&ss for webp&s
//     .then(pictures => pictures.map(w => ({
//       ...w,
//       url: w.url.replace('&amp;', '&s').replace('webp&ss', 'webp&s')
//       })))
//     // Format titles
//     .then(pictures => pictures.map(w => ({
//       ...w,
//       title: `${snakeCase(w.title)}.jpg`
//     })))
// }

async function main(folder) {
  const pictures = await fetchInfo(subreddit, sort, t, maxNumberOfPictures)
  try {
    pictures.forEach(w => download(w.url, `${folder}${w.title}`, () => console.log(`${w.title} done`)))
  } catch (error) {
    console.error(error)
  }
}

main(folder)