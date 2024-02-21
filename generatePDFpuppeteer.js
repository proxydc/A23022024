const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const data = require("./server/src/helpers/data.json");
const moment = require("moment");

const compile = async function(templatename, data) {
    const filepath = path.join(
        process.cwd(),
        "server/src/helpers/pdf_content",
        `${templatename}.hbs`
    );
    const html = await fs.readFile(filepath, "utf-8");
    return hbs.compile(html)(data);
};
hbs.registerHelper("dateFormat", function(value, format) {
    return moment(value).format(format);
});
(async function() {
    try {
        console.log("iam here");
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        const content = await compile("proxyDC", data);
        await page.setContent(content);
        await page.emulateMediaType("screen");
        console.log("iam here");
        /* const page2 = await browser.newPage();
         await page2.setContent(content);
         await page2.emulateMediaType("screen");
         console.log("iam here");*/

        const filename =
            "DossierCompetences-" +
            data.document.familyname +
            "-" +
            data.document.firstname +
            "-" +
            //new Date().toLocaleString() +
            ".pdf";
        //create pdf
        await page.pdf({
            path: path.resolve(process.env.USERPROFILE + "/Downloads/" + filename),
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: "<div>test header</div>",
            footerTemplate: "<div><div class='pageNumber'></div> <div>/</div><div class='totalPages'></div></div>",
        });
        /*await page2.pdf({
            path: path.resolve(process.env.USERPROFILE + "/Downloads/" + filename),
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: "<div>test header</div>",
            footerTemplate: "<div><div class='pageNumber'></div> <div>/</div><div class='totalPages'></div></div>",
        });*/
        console.log("Done creating pdf");
        await browser.close();

        process.exit();
    } catch (error) {
        console.log(error);
    }
})();