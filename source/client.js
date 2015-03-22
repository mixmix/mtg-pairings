var xhr = require('xhr')
var dom = require('domquery')

xhr({
    uri: '/api/pdf-data',
    headers: {
        'Content-Type': 'application/json'
    }
}, function (err, resp, body) {
  var results = JSON.parse(body)

  //results.lines.forEach( addLine )
  var content = '<div>' + results.lines.join('<br>').replace(/[0-9]{5,}|DCI/g,'').replace(/\s/g, '&nbsp;') + '</div>'
  //console.log(content)
   
  dom('#data-box').add( content )
})

document.querySelector('input').onchange = function() {
  document.querySelector('form').submit();
};
