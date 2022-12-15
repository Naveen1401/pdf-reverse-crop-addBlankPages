const { PDFDocument, degrees } = PDFLib;

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

function renderAllPages() {
    for (let i = 1; i <= totalPages; i++) {
        pdf.getPage(i).then(function (page) {
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

            if (i == totalPages) {
                last_selector.setAttribute("type", "checkbox");
                last_selector.setAttribute("value", `${i + 1}`);
                last_selector.setAttribute("onchange", "check(this.value)");
                last_selector.setAttribute("id", "selectToAll" + `${i + 1}`);
                last_selector.className = "checkbox_input";

                lastplusIcon.src = "/plus.svg";
                lastplusIcon.style.height = "30px";
                lastminusIcon.src = "/minus.svg";
                lastminusIcon.style.height = "30px";

                lastminusIcon.setAttribute("data-page", `${i + 1}`);
                lastplusIcon.setAttribute("data-page", `${i + 1}`);
                lastplusIcon.setAttribute("onclick", "plus(this)");
                lastminusIcon.setAttribute("onclick", "minus(this)");
                lastplusIcon.setAttribute("id", "plusIcon" + `${i + 1}`);
                lastminusIcon.setAttribute("id", "minusIcon" + `${i + 1}`);
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

            if (i == 1) {
                // let firstCanvas = document.createElement("canvas");
                // firstCanvas.setAttribute("id", "page_div" + `${0}`);
                // firstCanvas.height = div_height;
                // firstCanvas.className = "blank_canvas";
                // firstCanvas.width = div_width;
                // firstCanvas.style.background = "#ffffff";
                // document.getElementById("main_container").appendChild(firstCanvas);
                // firstCanvas.style.display = "none";
                let div0 = document.createElement("div");
                div0.setAttribute("id", "page_div" + `${0}`);
                div0.setAttribute("class", "page_div");
                document.getElementById("main_container").appendChild(div0);
            }

            // let blank_canvas = document.createElement("canvas");
            // blank_canvas.id = "blank_canvas" + `${i}`;
            // blank_canvas.className = "blank_canvas";
            // blank_canvas.height = div_height;
            // blank_canvas.width = div_width;
            // blank_canvas.style.background = "#ffffff";
            // blank_canvas.style.display = "none";

            wrapper.appendChild(canvas);
            wrapper.appendChild(page_number_display);
            // wrapper.appendChild(blank_canvas);
            document.getElementById("main_container").appendChild(page_selector);
            document.getElementById("main_container").appendChild(plusIcon);
            document.getElementById("main_container").appendChild(minusIcon);
            document.getElementById("main_container").appendChild(wrapper);

            if (i == totalPages) {
                document.getElementById("main_container").appendChild(last_selector);
                document.getElementById("main_container").appendChild(lastplusIcon);
                document.getElementById("main_container").appendChild(lastminusIcon);
            }

            page.render(renderContext);
        });
    }
}

const plus = (plusValue) => {
    let p = plusValue.getAttribute("data-page");
    console.log(p);
    // check(p);
    let p_int = parseInt(p);
    document.getElementById("selectToAll" + `${p_int}`).click();
    // document.getElementById("plusIcon" + `${p_int}`).style.display = "none";
    // document.getElementById("minusIcon" + `${p_int}`).style.display = "inline";
};

const minus = (minusValue) => {
    let q = minusValue.getAttribute("data-page");
    console.log(q);
    // check(q);
    let q_int = parseInt(q);
    document.getElementById("selectToAll" + `${q_int}`).click();
    document.getElementById("plusIcon" + `${q_int}`).style.display = "inline";
    document.getElementById("minusIcon" + `${q_int}`).style.display = "none";
};

const btw_all = () => {
    for (let i = 2; i <= totalPages + 1; i++) {
        let temp = document.getElementById("selectToAll" + `${i}`);
        temp.click();
    }
};

var forFirstCanvas = false;
let random_value = 14;

const check = (valuee) => {
    let x = parseInt(valuee);

    //adding and removing a blank canvas at first on click to checkbox
    // if (x == 1) {
    //     if (forFirstCanvas == false) {
    //         document.getElementById("page_div0").style.display = "block";
    //         forFirstCanvas = true;
    //     } else {
    //         document.getElementById("page_div0").style.display = "none";
    //         forFirstCanvas = false;
    //     }
    // } 
    // else {
    //     //adding a blank canvas on click to checkbox
    //     let temp_selector = document.getElementById("selectToAll" + `${x}`);
    //     if (temp_selector.checked) {
    //         document.getElementById("blank_canvas" + `${x - 1}`).style.display =
    //             "inline";
    //     } else {
    //         document.getElementById("blank_canvas" + `${x - 1}`).style.display =
    //             "none";
    //     }
    // }

    let blank_canvas = document.createElement("canvas");
    let cross_icon = document.createElement("img");
    let blank_cross_div = document.createElement("div");
    cross_icon.src = "/cross.svg";
    cross_icon.className = "cross_btn";
    cross_icon.setAttribute("data-cross-value", `${x}`);
    cross_icon.setAttribute("data-random-value", `${random_value+1}`);
    cross_icon.setAttribute("id", "cross_random_value"+`${random_value+1}`);
    cross_icon.setAttribute("onclick","cross(this)");
    cross_icon.style.display = "none";
    cross_icon.style.marginTop = `${div_height / 2 - 11}` + "px";
    cross_icon.style.marginLeft = `${div_width / 2 - 11}` + "px";

    cross_icon.setAttribute("onmouseover", "cross_display_icon(this)");
    cross_icon.setAttribute("onmouseout", "cross_hide_icon(this)");

    blank_canvas.setAttribute("data-blank-page",`${x}`);
    blank_canvas.setAttribute("data-blank-random-value", `${random_value + 1}`);
    blank_canvas.setAttribute("onmouseover", "cross_display(this)");
    blank_canvas.setAttribute("onmouseout", "cross_hide(this)");
    blank_canvas.setAttribute("id", "blank_page_random_value"+`${random_value+1}`);
    blank_canvas.className = "blank_canvas";
    blank_canvas.height = div_height;
    blank_canvas.width = div_width;
    blank_canvas.style.background = "#ffffff";
    // blank_canvas.style.display = "none";

    blank_cross_div.appendChild(cross_icon);
    blank_cross_div.appendChild(blank_canvas);


    document.getElementById("page_div"+`${x-1}`).appendChild(blank_cross_div);
    // document.getElementById("page_div"+`${x-1}`).appendChild(blank_canvas);


    //adding values inside a map for working
    if (myMap.has(x)) {
        let key_val = myMap.get(x) + 1;
        myMap.set(x, key_val);
    } else {
        myMap.set(x, 1);
    }
    console.log(x,"->",myMap.get(x));
    random_value = random_value + 1;
};


const cross_display = (val) =>{
    let hov = parseInt(val.getAttribute("data-blank-random-value"));
    document.getElementById("cross_random_value" + `${hov}`).style.display = "inline";
};
const cross_hide = (val) =>{
    let hov = parseInt(val.getAttribute("data-blank-random-value"));
    document.getElementById("cross_random_value" + `${hov}`).style.display = "none";
};

const cross_display_icon = (val) =>{
    val.style.display = "inline";
};
const cross_hide_icon = (val) =>{
    val.style.display = "none"
};

const cross = (cross_tag)=>{
    let randomValue = parseInt(cross_tag.getAttribute("data-random-value"));
    console.log(randomValue);

    document.getElementById("blank_page_random_value" + `${randomValue}`).style.display = "none";
    document.getElementById("cross_random_value" + `${randomValue}`).style.display = "none";

    let pageValue = parseInt(cross_tag.getAttribute("data-cross-value"));
    let key_valu = myMap.get(pageValue) - 1;
    myMap.set(pageValue, key_valu);
    console.log(pageValue);
}




function modify() {
    // console.log(myMap);
    modifyPdf(loadingTask1);
}

async function modifyPdf(existingPdfBytes) {
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    let arr = [];

    for (let key of myMap.keys()) {
        let num = myMap.get(key);
        for(let i=0; i<num; i++){
            arr.push(key);
        }
    }
    // for (let key of myMap.keys()) {
    //     if (myMap.get(key) % 2 != 0) arr.push(key);
    // }
    arr.sort(function (a, b) {
        return a - b;
    });
    console.log(arr);

    let x = 0;
    let gate = false;
    arr.forEach((v) => {
        let value = v - 1;
        if (value + x == pdfDoc.getPageCount()) {
            value--;
            gate = true;
        }
        let refPage = pdfDoc.getPage(value + x);
        let { width, height } = refPage.getSize();
        let rotationAngle = refPage.getRotation().angle;
        let page = pdfDoc.addPage([width, height]);
        page.setRotation(degrees(rotationAngle));
        const lastpageIndex = pdfDoc.getPageCount() - 1;
        if (gate == false) {
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
