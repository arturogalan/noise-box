
function init(window) {
  const headerTag = window.document.getElementsByTagName('head')[0];
  const headerScript = document.createElement('script');
  headerScript.async = 1;
  headerScript.src = "https://www.googletagmanager.com/gtag/js?id=UA-152336680-1";
  const headerScript2 = document.createElement('script');
  headerScript2.text = `
    <!-- Global site tag (gtag.js) - Google Analytics -->
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-152336680-1');
    `

  headerTag.appendChild(headerScript);
  headerTag.appendChild(headerScript2);
}

export default {init}