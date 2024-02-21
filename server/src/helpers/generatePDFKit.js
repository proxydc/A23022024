const PDFDoc = require("pdfkit");
const fs = require("fs");

const generatePDFKit = ({ filename = "output.pdf", data = [] }) => {
  // create a document, and enable bufferPages mode
  let i;
  let end;
  const doc = new PDFDoc({
    bufferPages: true,
    font: "Courier",
    fontSize: 12,
    size: "A4",
  });
  doc.pipe(fs.createWriteStream(filename));
  //doc.info.Title = "Dossier de compétences";
  doc.font("Courier-Bold", 25);
  doc.text("Dossier de compétences", {
    width: doc.page.width,
    align: "center",
  });
  doc.moveDown();
  // add some content...
  //doc.addPage();
  doc.fontSize(12);
  doc.text("Nom:       ", {
    width: doc.page.width,
    align: "left",
  });
  doc.font("Courier", 12);
  doc.text(data.familyname);
  doc.moveDown();
  doc.text("Prénom:    " + data.firstname, {
    width: doc.page.width,
    align: "left",
  });
  doc.moveDown();
  doc.text("Email:     " + data.email, {
    width: doc.page.width,
    align: "left",
  });
  doc.moveDown();
  doc.text("Length: " + doc.miterLimit, {
    width: doc.page.width,
    align: "left",
  });

  // ...
  //doc.addPage();

  // see the range of buffered pages
  const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }

  for (
    i = range.start, end = range.start + range.count, range.start <= end;
    i < end;
    i++
  ) {
    doc.switchToPage(i);
    //doc.text(`Page ${i + 1} of ${range.count}`);
  }

  // manually flush pages that have been buffered
  doc.flushPages();

  // or, if you are at the end of the document anyway,
  // doc.end() will call it for you automatically.
  doc.end();
};

module.exports = generatePDFKit;
