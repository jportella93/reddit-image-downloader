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
for (let prop in envVariables) {
  let variable = process.env[prop];

  if (variable) {
    // Set type, as command line variables always come as string
    const type = typeof envVariables[prop];
    if (type === 'number') variable = Number(variable);
    if (type === 'boolean') variable = Boolean(variable);

    variablesToExport[prop] = variable;
  }
  else variablesToExport[prop] = envVariables[prop];
}

module.exports = variablesToExport;