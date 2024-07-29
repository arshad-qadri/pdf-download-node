const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// API endpoint to generate and download PDF from HTML content
app.post('/generate-pdf', async (req, res) => {
  const htmlContent = `<html><body><h1>My PDF Content</h1>
  <img height="200" src="https://images.pexels.com/photos/24460824/pexels-photo-24460824/free-photo-of-esb-among-lower-skyscrapers.jpeg" alt="test" />
  <p>This is a sample PDF generated from HTML.</p></body></html>`;

  try {
    // Launch Puppeteer with necessary arguments
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close Puppeteer
    await browser.close();

    // Set the response headers to trigger download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF.');
  }
});
app.get("/test",  async (req, res) => {
  res.json({message:"Hello world!"})
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
