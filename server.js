const express = require('express');
const app = express();
const path = require('path');

const port = 8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

// server redirects URL ADDRESS OF IMAGE, depending on Request headers
app.get('/download_app_image', (req, res) => {
  const headerPlatform = req.header("user-agent");

  if (headerPlatform.match('Windows') || headerPlatform.match('Android')) {
    res.redirect(302,'https://image.s12.sfmc-content.com/lib/fe2c11737164047b721076/m/1/app_test_android_image.png')
  } else if (headerPlatform.match('Macintosh') || headerPlatform.match('iPhone') || headerPlatform.match('iPad')) {
    res.redirect(302,'https://image.s12.sfmc-content.com/lib/fe2c11737164047b721076/m/1/app_test_ios_image.png')
  } else {
    res.render('https://image.s12.sfmc-content.com/lib/fe2c11737164047b721076/m/1/downloadapp_image.png');
  }
});

// server redirects URL ADDRESS OF LINK, depending on Request headers
app.get('/download_app_link', (req, res) => {
  const headerPlatform = req.header("user-agent");
  if (headerPlatform.match('Windows') || headerPlatform.match('Android')) {
    res.redirect(302,'https://play.google.com/store')
  } else if (headerPlatform.match('Macintosh') || headerPlatform.match('iPhone') || headerPlatform.match('iPad')) {
    res.redirect(302,'https://www.apple.com/app-store/')
  } else {
    res.render('general_download_page.ejs');
  }
});

// preview image for app download here
app.get('/download_app_in_page', (req, res) => {
  const regUserAgent = req.header("user-agent")
  const uaFullVersionList = req.header("sec-ch-ua")
  const headerPlatform = req.header("sec-ch-ua-platform")
  const processPlatform = process.platform
  res.render('download_app_in_page.ejs', { data: { regUserAgent, uaFullVersionList, headerPlatform, processPlatform } })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  //console.log(process.platform);
});