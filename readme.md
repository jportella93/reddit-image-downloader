# Reddit image downloader
Quick and easy program to download images from a specific subreddit.

## Usage
1. Install packages
```shell
$ npm i
```

2. Run the script, specifying the subreddit as a variable.
```shell
$ SUBREDDIT=wallpapers npm run start
```

3. See all the images appearing in `/downloads/`

## Config
To set variables, edit the values in `env.js`.
```javascript
// env.js

  MAX_PICTURES: 10, // limit is 100
  OUTPUT_DIR: './downloads/', // Absolute or relative
  SUBREDDIT: 'puppies',
  SORT_BY: 'top', // (top, controversial, hot, rising)
  TIME: 'month', // (hour,day,week,month,year,all)
```

You can also specify variables in the command line, these merge with the ones on `env.js` and override any duplicate.
```shell
$ SUBREDDIT=images MAX_PICTURES=3 npm run start
```
