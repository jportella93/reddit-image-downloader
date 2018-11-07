/** logger.js
* Log time before each message
*
* param: str message: The message to be logged
* param: obj options: Optionally pass an object containing a key "result"
*                     if value is 'error', message will be red and error logged
                      if value is 'success', message will be green
*/
function colorLog(color, message, error=false){
  if (color === 'green') color = 32
  if (color === 'red') color = 31
  const code = `\x1b[${color}m%s\x1b[0m`
  if (error) return console.error(code, message)
    else return console.log(code, message)
}

module.exports = function logger(message, options = {}) {
  const time = String(new Date()).slice(16, 24)
  function logStandard(message, time) {
    console.log(`[${time}] - ${message}`)
    return
  }
  if (options.result) {
    const result = options.result
    if (result === 'error') {
      colorLog('red', `[${time}] - ${message}`, error=true)
      return
    }
    else if (result === 'success') {
      colorLog('green',`[${time}] - ${message}`, error=false)
      return
    }
  }
  logStandard(message, time)
}
