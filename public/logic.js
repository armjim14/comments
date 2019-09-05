$.ajax({
    url: "/articles",
    method: "GET"
})
.done((resp) => {
    console.log(resp)
})

var allArticles = [];

if (localStorage.getItem('articles') == null) {
    console.log("no work");
} else {
    allArticles = JSON.parse(localStorage.getItem('articles'));
    renderArticles();
}

function renderArticles() {
    var saveArt = $("#savedArticles");
    var wid = window.innerWidth;
    saveArt.empty();
    for (let v in allArticles) {
        var mainDiv = $("<div>");
        var title = $(`<p id='savedTitle${allArticles[v]._id}' class='title'>`).text(allArticles[v].title);
        if (wid > 500 ){
            var aTag = $(`<a id='aavedArt${allArticles[v]._id}' class='forA' href="${allArticles[v].href}" target="_blank" >`).text("Click here to see full atricle");
            var buttonForComments = $(`<button onclick="commentArticle('${allArticles[v]._id}')" class='toSave'>`).text("Write a Comment");
            var buttonForDelete = $(`<button onclick='deleteArticle(${+v + 1})' class='toSave'>`).text("Delete Article");
        } else {
            var aTag = $(`<a id='aavedArt${allArticles[v]._id}' class='forA' href="${allArticles[v].href}" target="_blank" > Click here to see full atricle </a><br><br>`)
            var buttonForComments = $(`<button onclick="commentArticle('${allArticles[v]._id}')" class='toSave2'> Write a Comment </button><br>`);
            var buttonForDelete = $(`<button onclick='deleteArticle(${+v + 1})' class='toSave2'>`).text("Delete Article")
        }
        var hr = $("<hr class='forDiv'>").css("border", "darkgray 1.5px solid");
        mainDiv.append(title, aTag, buttonForDelete, buttonForComments, hr);
        saveArt.append(mainDiv);
    }
}

function saveArticle(id) {

    $.get(`/article/id/${id}`, (resp => {
            var send = {
                title: resp[0].title,
                href: resp[0].href,
                _id: resp[0]._id
            }
            var exist = allArticles.find((ar) => {
                return (ar._id == id) ? ar._id : null
            })
            
            if (exist){
                null
            } else {
                allArticles.push(send)
                localStorage.setItem("articles", JSON.stringify(allArticles))
            }
    }))

}

$("#returnHome").on("click", () => {
    window.location.href = "/";
})

function clearList() {
    allArticles = [];
    localStorage.setItem("articles", JSON.stringify(allArticles))

    $("#savedArticles").empty();
}

function deleteArticle(numx) {
    allArticles.splice(numx - 1, 1);
    localStorage.setItem("articles", JSON.stringify(allArticles))
    renderArticles();
}

// for modal
function commentArticle(id) {

    $.get(`/article/id/${id}`, (data) => {
        $("#allComments").empty();
        var arr = data[0].comments;
        $("#modal-title").text(data[0].title);
        $("#submitComment").attr("onclick", `sendComment('${id}')`)
        for( let v in arr ){
            var p = $("<p>").text(arr[v])
            $("#allComments").append(p)
        }
    })
    $("#myModal").css("display", "block")
}

$("#closex").on("click", () => {
    $("#myModal").css("display", "none")
})
// end modal

function sendComment(id) {
    var sendComment = {
        _id: id,
        comment: $("#commentWritten").val()
    }
    $.post("/commment/id/", sendComment)
        .then(() => {
            console.log("comment send")
        })
        document.getElementById("commentWritten").value = "";
        commentArticle(id)
}