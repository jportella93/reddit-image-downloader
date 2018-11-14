// --- Pre-setted env variables ---
// Set your own variables here
const envVariables = {
  MAX_PICTURES: 10,
  OUTPUT_DIR: './downloads/',
  SUBREDDIT: 'wallpapers',
  SORT_BY: 'top',
  TIME: 'month',
};

// --- Command line variables ---
const variablesToExport = {};

// If a variable is pre-setted but also declared in the command line,
// give priority to the one on the command line.
// CAUTION: Numbers and Booleans will be treated as strings.
for (let prop in envVariables) {
  const variable = process.env[prop];
  if (variable) variablesToExport[prop] = variable;
  else variablesToExport[prop] = envVariables[prop];
}

module.exports = variablesToExport;