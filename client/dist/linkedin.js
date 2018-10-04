let liRoot = document.createElement('div');
liRoot.id = 'linkedin-root';

document.body.appendChild(liRoot);

(function(d, s, id) {
  const element = d.getElementsByTagName(s)[0];
  const ljs = element;
  var js = element;
  if (d.getElementById(id)) {
      return; }
  js = d.createElement(s);
  js.id = id;
  js.src = '//platform.linkedin.com/in.js';
  js.text = 'api_key: 86vkjzfew3pwlx';
  js.type = 'text/javascript'
  ljs.parentNode.insertBefore(js, ljs);
})(document, 'script', 'linkedin-sdk')