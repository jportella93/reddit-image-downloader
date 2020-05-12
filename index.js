const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');
const snakeCase = require('just-snake-case');

// --- Env variables ---
const ENV_VARIABLES = require('./env');
const { MAX_PICTURES, OUTPUT_DIR, SUBREDDIT, SORT_BY, TIME } = ENV_VARIABLES;

// --- Function declarations ---
async function getPicturesData(subreddit, sort_by, time, maxPictures) {
  const JSONresponse = await fetch(`https://www.reddit.com/r/${subreddit}/${sort_by}.json?t=${time}&limit=${maxPictures}`),
    parsedResponse = await JSONresponse.json(),
    postsData = parsedResponse.data.children;

  const filteredPicturesInfo = postsData.map(w => {
    // Mark posts that don't contain a picture to filter them
    if (!w.data.preview) return null;
    return ({
      title: w.data.title,
      url: w.data.preview.images[0].source.url // Hi-res picture is the first image of array
    });
  })
    .filter(el => el !== null);

  // Escape urls and format titles
  return filteredPicturesInfo.map(picture => ({
    url: picture.url.replace('&amp;', '&s').replace('webp&ss', 'webp&s'),
    title: `${snakeCase(picture.title)}.jpg`
  }));
}

function download(url, filename, callback) {
  request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
}

async function main(dir, subreddit, sort_by, time, maxPictures) {
  let downloadedImageCounter = 0;
  try {
    const pictures = await getPicturesData(subreddit, sort_by, time, maxPictures);
    await Promise.all(pictures.map(picture => new Promise(resolve =>
      download(picture.url, `${dir}${picture.title}`, () => {
        console.log(`${++downloadedImageCounter} - ${picture.title}`);
        resolve();
      }))
    ));
    console.log(`\n${downloadedImageCounter} images from r/${subreddit} downloaded in ${dir}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// --- Program execution ---
main(OUTPUT_DIR, SUBREDDIT, SORT_BY, TIME, MAX_PICTURES);
