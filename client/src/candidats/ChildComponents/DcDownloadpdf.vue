<template>
  <div class="hello">
    <button class="btn" v-on:click="createDoc(documentId)">
      DOWNLOAD DOCUMENT
    </button>
  </div>
</template>
<script>
import {
  AlignmentType,
  Document,
  Header,
  HeadingLevel,
  Packer,
  Paragraph,
  Tab,
  TabStopPosition,
  TabStopType,
  TextRun,
  ImageRun,
} from "docx";
import docData from "../../DocGeneration/tools/DocData"
const FileSaver = require("file-saver");
import urldc from "../../_helpers/urllist.js";
import axios from "axios";
//var docx = require("@nativedocuments/docx-wasm");
//const Format = require("@nativedocuments/docx-wasm/formats");
//import * as fs from 'fs';
//const fs = require('fs');
//import docxConverter from "@types/docx-pdf";
//const docxConverter = require('docx-pdf');
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      form: [],
      documentId: "",
      dbDoc: {},
      errormsg: "",
    };
  },
  mounted() {
    try {
      this.documentId = this.$route.params.id;
      this.createDoc();
    } catch (err) {
      this.errormsg = err.message;
    }
  },
  methods: {
    createDoc() {
      try {
        const url = urldc.getDcDocUrl(this.documentId);
        alert("urldc: " + url);
        axios.get(url).then((res) => {
          console.log("docdata: " + res);
          this.dbDoc = res.data;
        });
      } catch (err) {
        this.errormsg = err;
      }
      console.log("docdata: " + this.dbDoc);
      let docjs = this.dbDoc.document;
      alert("iam here" + this.dbDoc.document.email);
      var firstname = this.dbDoc.document.firstname;
      var lastname = "Doe";
      var message = "I just created a document using Vue.js 😲";
      // Create a new Document an save it in a variable${this.form[0].familyname}
      /*let doc = new Document({
        sections: []});*/
      let doc = new Document({
        sections: [
          {
            headers: {
              //  default: docData.GetHeader2(),
              //default: docData.getHeader(docjs.familyname, docjs.firstname),
            },
            properties: {},
            children: [
              docData.getTitle(),
              docData.LineBreak(),
              docData.getLine("Nom:     ", docjs.familyname),
              docData.getLineBreak(),
              docData.getLine("Prénom: ", docjs.firstname),
              docData.getLineBreak(),
              docData.getLine("Email:   ", docjs.email),
              docData.LineBreak(),
              docData.getSubTitle("Compétences fonctionnelles"),

              //docData.getComp(docjs.functionalAbilities),
              docData.LineBreak(),
              docData.getSubTitle("Compétences techniques"),
              //docData.getComp(docjs.technicalAbilities),
              docData.LineBreak(),
              docData.getSubTitle("Diplômes / Certifications"),
              docData.LineBreak(),
              // docData.getCerts(docjs.certifications),

            ],
          },
        ],
      });
      // To export into a .docx file
      this.saveDocumentToFile(doc, `vuedoc.docx`);
     // this.createPDF(doc);
      //this.doctopdf(doc, "pdf");
    },
    saveDocumentToFile(doc, fileName) {
      const mimeType =
        "application/pdf";
        let docblob ='';
      Packer.toBlob(doc).then((blob) => {
        //docblob = new Blob(blob.slice(0, blob.size, mimeType));
        docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
        //let pdfName = 'test'; 
    var docpdf = new jsPDF();
    var blobpdf = new Blob([docpdf.output(blob)], { type: 'application/pdf'});
    var bloburl = URL.createObjectURL(blobpdf);
    window.open(bloburl);
    alert("bloburl: "+ bloburl);
    //docpdf.text(docblob);
   // docpdf.save(pdfName + '.pdf');
       // doctopdf(docblob, "pdf");
      });
      //createPDF (docblob)
      alert("docblob: "+ docblob);
     /* docxConverter(docblob,'./output.pdf', (err, result) => {
  if (err) console.log(err);
  else console.log(result); // writes to file for us
});*/

    },




    /*saveDocumentToFile(doc, fileName) {
      const mimeType =
        "application/pdf";
        let docblob ='';
      Packer.toBlob(doc).then((blob) => {
        //docblob = new Blob(blob.slice(0, blob.size, mimeType));
        docblob = blob.slice(0, blob.size, mimeType);
        FileSaver.saveAs(docblob, fileName);
       // doctopdf(docblob, "pdf");
      });
      //createPDF (docblob)
    /*  docxConverter(docblob,'./output.pdf', (err, result) => {
  if (err) console.log(err);
  else console.log(result); // writes to file for us
});

    },*/
 /*  async createPDF (doctext) {
    let pdfName = 'test'; 
    var doc = new jsPDF();
    //doc.blob= await Packer.toBlob(doctext)
   // doc.save(pdfName + '.pdf');


    const mimeType =
        "application/pdf";
        let docblob ='';
      Packer.toBlob(doc).then((blob) => {
        docblob = blob.slice(0, blob.size, mimeType);
        doc.save(docblob);

       // doctopdf(docblob, "pdf");
      });

  }*/
   /* async doctopdf(docIn, formatOut) {
      alert(" await received ");
      const engine = await docx.engine();
      try {
        // load docx into engine
        await engine.load(docIn);
        alert(" loaded into docx_api ");
        // now export it
        var buffer;
        if (formatOut == Format.DOCX) {
          buffer = await engine.exportDOCX();
        } else if (formatOut == Format.PDF) {
          buffer = await engine.exportPDF();
        } else {
          throw new Error("Unsupported output format " + formatOut);
        }
        // close engine
        await engine.close();
        return buffer;
      } catch (e) {
        await engine.close();
        throw (e);
        // if (e) log.debug(e);
        // log.error("caught error loading "+srcKey);
      }

    },*/
  },
};
</script>