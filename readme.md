# Reddit image downloader
Quick and easy program to download images from a specific subreddit.

## Usage
1. Install packages
```shell
$ npm i
```

2. Set your target subbreddit in `/.env.js`

3. Run the script
```shell
$ npm run start
```

4. See all the images appearing in `/downloads`

## Config
```javascript
// env.js

  MAX_PICTURES: 10,
  OUTPUT_DIR: './downloads/', // Absolute or relative
  SUBREDDIT: 'wallpapers',
  SORT_BY: 'top', // (top, controversial, hot, rising)
  TIME: 'month', // (hour,day,week,month,year,all)
```
