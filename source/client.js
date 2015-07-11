var xhr = require('xhr')
var dom = require('domquery')

xhr({
    uri: '/api/pdf-data',
    headers: {
        'Content-Type': 'application/json'
    }
}, function (err, resp, body) {
  var results = JSON.parse(body)

  if (results.error) { console.error(results.error) }

  var content = '<div>' +
                  results.lines.map( lineFixer ).join('<br />')
                '</div>'

  dom('#data-box').add( content )
})

function lineFixer(string) {
  console.log(string)
  return string
         .replace(/(Round [0-9]+)/,"<strong>$1</strong><br><br>")
         .replace(/[0-9]{5,}|DCI/g,'')
         .replace(/Wizards.*LLC/,'')
         .replace(/Wizards.*(\d{4}\/\d{2}\/\d{2}.*)/, "$1")
         .replace(/(Report|Event).*/, '')
         .replace(/Table.*Player.*/g, 'Table      Player                 Opponent               Points')
         .replace(/\s{2}(\w)/g, '$1')
         .replace(/\s/g, '&nbsp;')
         .replace(/^-{20}/g, '')
}

document.querySelector('input').onchange = function() {
  document.querySelector('form').submit();
}
