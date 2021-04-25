const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const os = require('os');
// const path = require('path');

const app = express();
app.set('port', (process.env.PORT || 8080));

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.post('/api/puppeteer', async (req, res) => {
  try {
    const amazonUrl = req.body.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(amazonUrl, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
      const title = document.querySelector('#productTitle')
        .innerText;
      const price = document.querySelector('#priceblock_ourprice')
        .innerText;
      const pic = document.querySelector('#landingImage').src;
      const id = document.querySelector('.askAsin').value;
      console.log(id);
      return {
        title,
        price,
        pic,
        id,
      };
    });
    await browser.close();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log('That did not go well.', error);
  }
});

// if (process.env.NODE_ENV === 'production') {
//   // Exprees will serve up production assets
//   app.use(express.static('client/build'));
//   // Express serve up index.html file if it doesn't recognize route
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
