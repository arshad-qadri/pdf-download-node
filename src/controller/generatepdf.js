const puppeteer = require('puppeteer');

exports.generatePdf = async (req, res) => {
  const htmlContent = `<html><body><h1>My PDF Content</h1>
  <img height="200" src="https://images.pexels.com/photos/24460824/pexels-photo-24460824/free-photo-of-esb-among-lower-skyscrapers.jpeg" alt="test" />
  <p>This is a sample PDF generated from HTML.</p></body></html>`;

  try {
    // Ensure Puppeteer has the necessary Chromium installed
    await puppeteer.launch(); // This will automatically download Chromium if not available

    // Launch Puppeteer with necessary arguments
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: puppeteer.executablePath() // Ensure Puppeteer uses the correct executable path
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
    res.status(500).send({ message: 'Error generating PDF.', err: err.stack });
  }
};
