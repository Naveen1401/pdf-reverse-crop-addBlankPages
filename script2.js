// const { scale } = require("pdf-lib");

const { PDFDocument, degrees } = PDFLib;

// const file = (input) => {
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
//     modifyPdf(loadingTask1);
//   };
// };

// async function modifyPdf(existingPdfBytes) {
//   const pdfDoc = await PDFDocument.load(existingPdfBytes);

//   //   const numberOfPages = 7;
//   //   const i = 2;

//   //   for (let x = 0; x + i < numberOfPages; x++) {
//   //     let pdfPage0 = pdfDoc.getPage(i);
//   //     pdfDoc.removePage(i);
//   //     pdfDoc.insertPage(numberOfPages - x, pdfPage0);
//   //   }

// //   const pageNum = 3 - 1;

// let arr = [1,3,4,4,7,11];
// let x = 0;
// let gate = false;
//   arr.forEach((v) => {
//     let value = v-1;

//     if(value+x == pdfDoc.getPageCount()){
//         value--;
//         gate = true;
//     }

//     let refPage = pdfDoc.getPage(value+x);
//     let { width, height } = refPage.getSize();
//     let rotationAngle = refPage.getRotation().angle;
//     let page = pdfDoc.addPage([width, height]);
//     page.setRotation(degrees(rotationAngle));

//     const lastpageIndex = pdfDoc.getPageCount()-1;

//     if(gate == false){
//         let blankPage = pdfDoc.getPage(lastpageIndex);
//         pdfDoc.removePage(lastpageIndex);
//         pdfDoc.insertPage(value + x, blankPage);
//         x++;
//     }
//   });

// //   let pdfPage0 = pdfDoc.getPage(0);
// //   const { width, height } = pdfPage0.getSize();
// //   const rotationAngle = pdfPage0.getRotation().angle;

// //   const page = pdfDoc.addPage([width, height]);
// //   page.setRotation(degrees(rotationAngle));

// //   console.log(width, height, rotationAngle);

//   const pdfBytes = await pdfDoc.save();

//   var binaryData = [];
//   binaryData.push(pdfBytes);
//   const blobUrl = window.URL.createObjectURL(
//     new Blob(binaryData, { type: "application/pdf" })
//   );

//   var link = document.createElement("a");
//   link.setAttribute("target", "_blank");
//   link.href = blobUrl;

//   link.dispatchEvent(new MouseEvent("click"));

//   console.log(pdfBytes);
// }












var loadingTask1;
var pdf = null;
var pageNumber = 1;
var pdfBytes = null;
var totalPages = 1;
var btwAllPages = false;
const myMap = new Map();


const file = (input) => {
  let fileReader = new FileReader();
  if (input.files && input.files[0]) {
    CurrentPdf = input.files[0];
    fileReader.readAsDataURL(CurrentPdf);
  }

  fileReader.onload = async function (fileLoadedEvent) {
    const loadingTask = await pdfjsLib.getDocument(fileReader.result);

    console.log(loadingTask);

    //get the pdf data to render it
    loadingTask.promise.then(function (pdff) {
      totalPages = pdff.numPages;
      // val.setAttribute("placeholder", "1-" + `${totalPages}`);
      // val.setAttribute("max", `${totalPages}`);
      console.log(pdff);
      pdf = pdff;
      // renderpage(pageNumber);
      renderAllPages();
    });

    var URL = fileLoadedEvent.target.result;
    loadingTask1 = await fetch(URL).then((res) => res.arrayBuffer());
    CurrentPdf_PDFLIB = loadingTask1;
    console.log(loadingTask1);
    // modifyPdf(loadingTask1);
  };
};


// var wrapper = document.createElement("div");
var div_height, div_width;


function renderAllPages(){
  for(let i=1; i<=totalPages; i++){

    pdf.getPage(i).then(function(page){
      let scale = 0.2;
      var viewport = page.getViewport({ scale: scale });
      var wrapper = document.createElement("div");
      wrapper.className = "page_div";
      var page_selector = document.createElement("input");
      var plusIcon = document.createElement("img");
      plusIcon.src = "/plus.svg";
      plusIcon.style.height = "30px";
      var minusIcon = document.createElement("img");
      minusIcon.src = "/minus.svg";
      minusIcon.style.height = "30px";
      var last_selector = document.createElement("input");
      var page_number_display = document.createElement("span");
      page_number_display.innerText = `${i}`;
      page_number_display.className = "page_num_display";
      page_selector.setAttribute("type", "checkbox");
      page_selector.setAttribute("value", `${i}`);
      page_selector.className = "checkbox_input";
      minusIcon.setAttribute("data-page", `${i}`);
      plusIcon.setAttribute("data-page", `${i}`);
      page_selector.setAttribute("onclick", "check(this.value)");
      plusIcon.setAttribute("onclick", "plus(this)");
      minusIcon.setAttribute("onclick", "minus(this)");
      page_selector.setAttribute("id", "selectToAll" + `${i}`);
      plusIcon.setAttribute("id", "plusIcon" + `${i}`);
      minusIcon.setAttribute("id", "minusIcon" + `${i}`);
      minusIcon.style.display = "none";
      wrapper.setAttribute("id", "page_div" + `${i}`);

      var lastplusIcon = document.createElement("img");
      var lastminusIcon = document.createElement("img");

      if(i==totalPages){
        last_selector.setAttribute("type", "checkbox");
        last_selector.setAttribute("value", `${i+1}`);
        last_selector.setAttribute("onchange", "check(this.value)");
        last_selector.setAttribute("id", "selectToAll" + `${i+1}`);
        last_selector.className = "checkbox_input";

        lastplusIcon.src = "/plus.svg";
        lastplusIcon.style.height = "30px";
        lastminusIcon.src = "/minus.svg";
        lastminusIcon.style.height = "30px";

        lastminusIcon.setAttribute("data-page", `${i+1}`);
        lastplusIcon.setAttribute("data-page", `${i+1}`);
        lastplusIcon.setAttribute("onclick", "plus(this)");
        lastminusIcon.setAttribute("onclick", "minus(this)");
        lastplusIcon.setAttribute("id", "plusIcon" + `${i+1}`);
        lastminusIcon.setAttribute("id", "minusIcon" + `${i+1}`);
        lastminusIcon.style.display = "none";

      }

      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      div_height = viewport.height;
      div_width = viewport.width;

      if(i==1){
        let firstCanvas = document.createElement("canvas");
        firstCanvas.setAttribute("id", "page_div" + `${0}`);
        firstCanvas.height = div_height;
        firstCanvas.className = "blank_canvas";
        firstCanvas.width = div_width;
        firstCanvas.style.background = "#ffffff";
        document.getElementById("main_container").appendChild(firstCanvas);
        firstCanvas.style.display = "none";
      }

      let blank_canvas = document.createElement("canvas");
      blank_canvas.id = "blank_canvas"+`${i}`
      blank_canvas.className = "blank_canvas";
      blank_canvas.height = div_height;
      blank_canvas.width = div_width;
      blank_canvas.style.background = "#ffffff";
      blank_canvas.style.display = "none";
      
      wrapper.appendChild(canvas);
      wrapper.appendChild(page_number_display);
      wrapper.appendChild(blank_canvas);
      document.getElementById("main_container").appendChild(page_selector);
      document.getElementById("main_container").appendChild(plusIcon);
      document.getElementById("main_container").appendChild(minusIcon);
      document.getElementById("main_container").appendChild(wrapper);

      if(i==totalPages){
        document.getElementById("main_container").appendChild(last_selector);
        document.getElementById("main_container").appendChild(lastplusIcon);
        document.getElementById("main_container").appendChild(lastminusIcon);
      }

      page.render(renderContext);

    })  
  }
}


const plus = (plusValue) =>{
  let p = plusValue.getAttribute("data-page");
  console.log(p)
  // check(p);
  let p_int = parseInt(p);
  document.getElementById("selectToAll"+`${p_int}`).click();
  document.getElementById("plusIcon" + `${p_int}`).style.display = "none";
  document.getElementById("minusIcon" + `${p_int}`).style.display = "inline";
}

const minus = (minusValue) =>{
  let q = minusValue.getAttribute("data-page");
  console.log(q);
  // check(q);
  let q_int = parseInt(q);
  document.getElementById("selectToAll" + `${q_int}`).click();
  document.getElementById("plusIcon" + `${q_int}`).style.display = "inline";
  document.getElementById("minusIcon" + `${q_int}`).style.display = "none";
}

const btw_all = () => {
  for(let i=2; i<=totalPages+1; i++){
    let temp = document.getElementById("selectToAll"+`${i}`);
    if(btwAllPages==false){
      if (!temp.checked) {
        temp.click();
        console.log("inlineUP")
        document.getElementById("plusIcon" + `${i}`).style.display = "none";
        document.getElementById("minusIcon" + `${i}`).style.display = "inline";
      }
    }else{
      if (temp.checked) {
        temp.click();
        console.log("inlineUP");
        document.getElementById("plusIcon" + `${i}`).style.display = "inline";
        document.getElementById("minusIcon" + `${i}`).style.display = "none";
      }
    }
  }
  if(btwAllPages==false) btwAllPages = true;
  else btwAllPages = false;
};

var forFirstCanvas = false;

const check = (valuee) =>{
  let x = parseInt(valuee);

  //adding and removing a blank canvas at first on click to checkbox
  if(x==1){
    if(forFirstCanvas == false){
      document.getElementById("page_div0").style.display = "block";
      forFirstCanvas = true;
    }else{
      document.getElementById("page_div0").style.display = "none";
      forFirstCanvas = false;
    }
  }else{
    //adding a blank canvas on click to checkbox
    let temp_selector = document.getElementById("selectToAll" + `${x}`);
    if (temp_selector.checked) {
      document.getElementById("blank_canvas" + `${x - 1}`).style.display =
        "inline";
    } else {
      document.getElementById("blank_canvas" + `${x - 1}`).style.display =
        "none";
    }
  }

  

  //remove blank pages on click checkbox


  //adding values inside a map for working
  if(myMap.has(x)){
    let key_val = myMap.get(x)+1;
    myMap.set(x, key_val);
  }else{
    myMap.set(x,1);
  }
  console.log(myMap.get(x)%2);
}




function modify() {
  modifyPdf(loadingTask1);
}

async function modifyPdf(existingPdfBytes) {
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  let arr = [];

  for(let key of myMap.keys()){
    if(myMap.get(key)%2 != 0)
    arr.push(key);
  }
  arr.sort(function(a, b){return a - b});
  console.log(arr);

  let x = 0;
  let gate = false;
    arr.forEach((v) => {
      let value = v-1;
      if(value+x == pdfDoc.getPageCount()){
          value--;
          gate = true;
      }
      let refPage = pdfDoc.getPage(value+x);
      let { width, height } = refPage.getSize();
      let rotationAngle = refPage.getRotation().angle;
      let page = pdfDoc.addPage([width, height]);
      page.setRotation(degrees(rotationAngle));
      const lastpageIndex = pdfDoc.getPageCount()-1;
      if(gate == false){
          let blankPage = pdfDoc.getPage(lastpageIndex);
          pdfDoc.removePage(lastpageIndex);
          pdfDoc.insertPage(value + x, blankPage);
          x++;
      }
    });

    const pdfBytes = await pdfDoc.save();
    var binaryData = [];
    binaryData.push(pdfBytes);
    const blobUrl = window.URL.createObjectURL(
      new Blob(binaryData, { type: "application/pdf" })
    );
    var link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.href = blobUrl;
    link.dispatchEvent(new MouseEvent("click"));
    console.log(pdfBytes);
}







// // render pdf page and convert it into image and then get the croping dimentions
// function renderpage(num) {
//   console.log("PDF loaded");
//   console.log(num);
//   // Fetch the first page
//   $("#img_container").html("");
//   $("#img_container").html("<canvas id='my_canvas'></canvas>");

//   var canvas = document.getElementById("my_canvas");
//   var context = canvas.getContext("2d");
//   // canvas.style.display = "block";

//   pdf.getPage(num).then(function (page) {
//     console.log("Page loaded");

//     var scale = 1;
//     var viewport = page.getViewport({ scale: scale });

//     // Prepare canvas using PDF page dimensions

//     canvas.height = page.getViewport({ scale: 1 }).height;
//     canvas.width = page.getViewport({ scale: 1 }).width;

//     document.getElementById("img_container").style.height =
//       `${canvas.height}` + "px";
//     document.getElementById("img_container").style.width =
//       `${canvas.width}` + "px";

//     // Render PDF page into canvas context
//     var renderContext = {
//       canvasContext: context,
//       viewport: viewport,
//     };
//     img.id = "hi";
//     var renderTask = page.render(renderContext);
//     // canvas.style.display = "none";
//     // renderTask.promise.then(function () {
//     //   // var img = new Image();
//     // });
//   });
//   console.log("done");
// }

// // function to trigger actual cropping of pdf
// function modify() {
//   modifyPdf(loadingTask1);
// }

// //pdf cropping function
// async function modifyPdf(existingPdfBytes) {
//   const pdfDoc = await PDFDocument.load(existingPdfBytes);

//   if (flag == true) {
//     for (let i = 0; i < pdfDoc.getPageCount(); i++) {
//       let page_ = pdfDoc.getPage(i);
//       let h_ = page_.getHeight();
//       page_.setCropBox(c_x, h_ - c_y - c_height, c_width, c_height);
//     }
//   } else {
//     let page = pdfDoc.getPage(pageNumber - 1);
//     let h = page.getHeight();

//     page.setCropBox(c_x, h - c_y - c_height, c_width, c_height);
//     pdfDoc.addPage([100, 100]);
//   }

//   pdfBytes = await pdfDoc.save();

//   const loadingTask2 = pdfjsLib.getDocument(pdfBytes);
//   loadingTask2.promise.then((CurrentPdfFile) => {
//     console.log(CurrentPdfFile);
//     cropper.destroy();
//     pdf = CurrentPdfFile;
//     renderpage(pageNumber);
//   });

//   // var binaryData = [];
//   // binaryData.push(pdfBytes);
//   // const blobUrl = window.URL.createObjectURL(
//   //   new Blob(binaryData, { type: "application/pdf" })
//   // );

//   // var link = document.createElement("a");
//   // link.setAttribute("target", "_blank");
//   // link.href = blobUrl;
//   // //   link.download = "pdfBytes";
//   // link.dispatchEvent(new MouseEvent("click"));

//   // console.log(pdfBytes);
//   loadingTask1 = pdfBytes;
// }

// const nextPage = () => {
//   cropper.destroy();
//   pageNumber++;
//   renderpage(pageNumber);
// };
// const prePage = () => {
//   cropper.destroy();
//   pageNumber--;
//   renderpage(pageNumber);
// };
// const inputVal = () => {
//   cropper.destroy();
//   pageNumber = parseInt(val.value);
//   console.log(val);
//   renderpage(pageNumber);
// };
// const done = () => {
//   var binaryData = [];
//   binaryData.push(pdfBytes);
//   const blobUrl = window.URL.createObjectURL(
//     new Blob(binaryData, { type: "application/pdf" })
//   );

//   var link = document.createElement("a");
//   link.setAttribute("target", "_blank");
//   link.href = blobUrl;
//   //   link.download = "pdfBytes";
//   link.dispatchEvent(new MouseEvent("click"));

//   console.log(pdfBytes);
// };
