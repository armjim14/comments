$.get("/articles", (info) => {
    var art = $("#here")
    for(let v in info){
        var mainDiv = $("<div>");
        var title = $(`<p id='title${+v + 1}' class='title'>`).text(info[v].title);
        var aTag = $(`<a id='art${+v + 1}' class='forA' href='${info[v].href}' target="_blank" >`).text("Click here to see full atricle");
        var button = $(`<button onclick='saveArticle(${+v})' class='toSave'>`).text("Save Article");
        var hr = $("<hr class='forDiv'>").css("border", "darkgray 1.5px solid");
        mainDiv.append(title, aTag, button, hr);
        art.append(mainDiv);
    }
})

var allArticles = [];

if (localStorage.getItem('articles') == null){
    console.log("no work");
} else {
    allArticles = JSON.parse(localStorage.getItem('articles'));
    renderArticles();
}


function renderArticles(){
    var saveArt = $("#savedArticles");
    saveArt.empty();
    for(let v in allArticles){
        console.log(allArticles[v].num)
        var mainDiv = $("<div>");
        var title = $(`<p id='savedTitle${allArticles[v].num}' class='title'>`).text(allArticles[v].title);
        var aTag = $(`<a id='aavedArt${allArticles[v].num}' class='forA' href='${allArticles[v].href}' target="_blank" >`).text("Click here to see full atricle");
        var buttonForComments = $(`<button onclick='commentArticle(${allArticles[v].num})' class='toSave'>`).text("Write a Comment");
        var buttonForDelete = $(`<button onclick='deleteArticle(${+v + 1})' class='toSave'>`).text("Delete Article");
        var hr = $("<hr class='forDiv'>").css("border", "darkgray 1.5px solid");
        mainDiv.append(title, aTag, buttonForDelete, buttonForComments, hr);
        saveArt.append(mainDiv);
    }
}

function saveArticle(num){

    var titleName = $(`#title${num}`).text();
    var href = $(`#art${num}`).attr("href");

    var send = {
        num,
        title: titleName,
        href
    }

    allArticles.push(send)
    localStorage.setItem("articles", JSON.stringify(allArticles))
}

$("#returnHome").on("click", () => {
    window.location.href = "/";
})

function clearList(){
    allArticles = [];
    localStorage.setItem("articles", JSON.stringify(allArticles))

    $("#savedArticles").empty();
}

function deleteArticle(numx){
    allArticles.splice(numx-1, 1);
    localStorage.setItem("articles", JSON.stringify(allArticles))
    renderArticles();
}

function commentArticle(numx){
    console.log(allArticles);
    let temp = allArticles.filter( ar => ar.num == numx )
    console.log(temp)
    $("#modal-title").text(temp[0].title)
    $("#myModal").css("display", "block")
}

$("#closex").on("click", () => {
    $("#myModal").css("display", "none")
})