// import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
const { PDFDocument, StandardFonts, rgb } = PDFLib;

// async function file(){
//     const pdff = document.getElementById("pdff")
//     console.log(pdff);

// }

const file = (input) => {
  var fileReader = new FileReader();
  if (input.files && input.files[0]) {
    CurrentPdf = input.files[0];
    // FileName.innerText = CurrentPdf.name;
    // filenameData = CurrentPdf.name;
    fileReader.readAsDataURL(CurrentPdf);
  }
  fileReader.onload = async function (fileLoadedEvent) {
    var URL = fileLoadedEvent.target.result;
    const loadingTask1 = await fetch(URL).then((res) => res.arrayBuffer());
    CurrentPdf_PDFLIB = loadingTask1;
    console.log(loadingTask1);
    modifyPdf(loadingTask1);
    // const loadingTask2 = pdfjsLib.getDocument(URL);
    // loadingTask2.promise.then((CurrentPdfFile) => {
    //   CurrentPdf = CurrentPdfFile;
    //   console.log(CurrentPdfFile);
    // //   getPreviewPagePDF(CurrentPdfFile);
    //   Container.classList.add("ContainerOnloading");
    // });
  };
};



async function modifyPdf(existingPdfBytes) {
  //   const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
  //   const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  //   console.log(existingPdfBytes);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
//   const pdfBytes2 = await pdfDoc.save();
//   console.log(pdfBytes2);

const numberOfPages = pdfDoc.getPageCount();

for(let i=0; i < numberOfPages ; i++){
    let pdfPage0 = pdfDoc.getPage(0);
    pdfDoc.removePage(0); 
    pdfDoc.insertPage(numberOfPages-i-1, pdfPage0);
}

// const numberOfPages = 7;
// const i = 2;

// for (let x = 0; x+i < numberOfPages; x++) {
//   let pdfPage0 = pdfDoc.getPage(i);
//   pdfDoc.removePage(i);
//   pdfDoc.insertPage(numberOfPages - x , pdfPage0);
// }


// const numberOfPages =  pdfDoc.getPageCount();

// console.log(numberOfPages);

//   const pdfPage1 = pdfDoc.getPage(1);
//   const pdfPage0 = pdfDoc.getPage(0);
//   pdfDoc.insertPage(0, pdfPage1);
//   pdfDoc.insertPage(1, pdfPage0);
//   pdfDoc.removePage(2); 
//   pdfDoc.removePage(2); 


  //   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  //   const pages = pdfDoc.getPages();
  //   const firstPage = pages[0];
  //   const { width, height } = firstPage.getSize();
  //   firstPage.drawText("This text was added with JavaScript!", {
  //     x: 5,
  //     y: height / 2 + 300,
  //     size: 50,
  //     font: helveticaFont,
  //     color: rgb(0.95, 0.1, 0.1),
  //     // rotate: degrees(-45),
  //   });

  const pdfBytes = await pdfDoc.save();

  var binaryData = [];
  binaryData.push(pdfBytes);
  const blobUrl = window.URL.createObjectURL(
    new Blob(binaryData, { type: "application/pdf" })
  );
  //   const blobUrl = window.URL.createObjectURL(pdfBytes);

  var link = document.createElement("a");
  link.setAttribute("target", "_blank");
  link.href = blobUrl;
  //   link.download = "pdfBytes";
  link.dispatchEvent(new MouseEvent("click"));

  console.log(pdfBytes);
}










// let pdfBytes = null;
// let inputedFile = "";
// const getScript = document.currentScript;
// const pageTool = getScript.dataset.tool;
// const lang = getScript.dataset.lang;
// const pdfbutton = document.getElementById("pdf-button");
// const inputCont = document.querySelector(".input-cont");
// const showFileName = document.getElementById("file-name");
// const getpdf = document.getElementById("get-pdf");
// const loader = document.querySelector(".ProgressInfo");
// const pdfOptions = document.querySelector(".pdf-options");
// const proceedButton = document.querySelector("#options-button");
// const gdrive = document.querySelector("#filepicker");
// const getFile = (file) => {
//   inputedFile = file;
// };
// const showLoader = () => {
//   loader.style.display = "flex";
//   inputCont.style.display = "none";
// };
// const closeLoader = () => {
//   loader.style.display = "none";
//   pdfOptions.style.display = "flex";
// };
// const mimeTypes = "application/pdf";
// const filemimes = [".pdf"];
// gdrive.addEventListener(
//   "click",
//   (getFile, mimeTypes, showLoader, closeLoader) => {
//     const data = loadPicker();
//   }
// );
// const getDropBoxFile = (file) => {
//   inputedFile = file;
// };
// const dropbox = document.getElementById("dropbox");
// dropbox.addEventListener(
//   "click",
//   async (getDropBoxFile, showLoader, closeLoader) => {
//     const getFile = chooseFromDropbox();
//   }
// );
// pdfbutton.addEventListener("click", () => {
//   getpdf.click();
// });

// const { PDFDocument, StandardFonts, rgb } = PDFLib;

// let pdfPages = [];
// const processFile = (input, start, end) => {
//   var fileReader = new FileReader();
//   if (input.files && input.files[0]) {
//     CurrentPdf = input.files[0];
//     fileReader.readAsDataURL(CurrentPdf);
//   }
//   fileReader.onload = async function (fileLoadedEvent) {
//     var URL = fileLoadedEvent.target.result;
//     const loadingTask1 = await fetch(URL).then((res) => res.arrayBuffer());
//     CurrentPdf_PDFLIB = loadingTask1;
//     console.log(loadingTask1);
//     modifyPdf(loadingTask1, start, end);
//   };
//   async function modifyPdf(existingPdfBytes, i, numberOfPages) {
//     const pdfDoc = await PDFDocument.load(existingPdfBytes);

//     // const numberOfPages = pdfDoc.getPageCount();

//     // for(let i=0; i < numberOfPages ; i++){
//     //     let pdfPage0 = pdfDoc.getPage(0);
//     //     pdfDoc.removePage(0);
//     //     pdfDoc.insertPage(numberOfPages-i-1, pdfPage0);
//     // }

//     numberOfPages = numberOfPages - 1;
//     i = i - 1;

//     for (let x = 0; x + i < numberOfPages; x++) {
//       let pdfPage0 = pdfDoc.getPage(i);
//       pdfDoc.removePage(i);
//       pdfDoc.insertPage(numberOfPages - x, pdfPage0);
//     }

//     pdfBytes = await pdfDoc.save();

//     document.querySelector(".download-section").style.display = "flex";
//     loader.style.display = "none";
//     pdfbutton.style.display = "block";
//   }
// };
// document.querySelector("#download").addEventListener("click", () => {
//   download(pdfBytes, "scanned-pdf.pdf", "application/pdf");
//   setTimeout(() => {
//     if (lang === "en") {
//       window.location.href = `/download?tool=${pageTool}`;
//     } else {
//       window.location.href = `/${lang}/download?tool=${pageTool}`;
//     }
//   }, 200);
// });
// getpdf.addEventListener("change", (e) => {
//   pdfOptions.style.display = "flex";
//   pdfbutton.style.display = "none";
//   inputCont.style.display = "none";
//   showFileName.innerHTML = e.target.files[0].name;
//   inputedFile = e.target.files[0];
//   e.target.value = "";

//   var numberOfPages;
//   var fileReader = new FileReader();
//   if (e.files && e.files[0]) {
//     CurrentPdf = e.files[0];
//     fileReader.readAsDataURL(CurrentPdf);
//   }
//   fileReader.onload = async function (fileLoadedEvent) {
//     var URL = fileLoadedEvent.target.result;
//     const loadingTask1 = await fetch(URL).then((res) => res.arrayBuffer());
//     CurrentPdf_PDFLIB = loadingTask1;
//     const pdfDocForVal = await PDFDocument.load(fileLoadedEvent);

//     numberOfPages = pdfDoc.getPageCount();
//   };
//   console.log(numberOfPages);

//   document
//     .getElementById("startingPage")
//     .setAttribute("placeholder", "1- " + `${numberOfPages}`);
//   document
//     .getElementById("endPage")
//     .setAttribute("placeholder", "1- " + `${numberOfPages}`);

//   document
//     .getElementById("startingPage")
//     .setAttribute("max", `${numberOfPages}`);
//   document.getElementById("endPage").setAttribute("max", `${numberOfPages}`);
// });
// proceedButton.addEventListener("click", () => {
//   pdfOptions.style.display = "none";
//   loader.style.display = "flex";
//   processFile(
//     inputedFile,
//     document.querySelector("#endPage").value,
//     // document.querySelector("#rotation").value,
//     document.querySelector("#startingPage").value
//   );
// });

// const downloadFunc = (url, type) => {
//   const a = document.createElement("a");
//   a.style.display = "none";
//   a.href = url;
//   a.download = `file.png`;
//   document.body.appendChild(a);
//   a.click();
//   loader.style.display = "none";
//   pdfbutton.style.display = "block";
// };

// const showDropDown = document.querySelector(".file-pick-dropdown");
// const icon = document.querySelector(".arrow-sign");
// const dropDown = document.querySelector(".file-picker-dropdown");
// showDropDown.addEventListener("click", (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   addScripts();
//   if (dropDown.style.display !== "none") {
//     dropDown.style.display = "none";
//     icon.classList.remove("fa-angle-up");
//     icon.classList.add("fa-angle-down");
//   } else {
//     dropDown.style.display = "block";
//     icon.classList.remove("fa-angle-down");
//     icon.classList.add("fa-angle-up");
//   }
// });