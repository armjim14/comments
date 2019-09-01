$.get("/articles", (info) => {
    var art = $("#here")
    for(let v in info){
        var mainDiv = $("<div>")
        var title = $("<p class='title'>").text(info[v].title);
        var aTag = $(`<a class='forA' href='${info[v].href}'>`).text("Click here to see full atricle");
        var button = $("<button class='toSave'>").text("Save Article")
        var hr = $("<hr class='forDiv'>").css("border", "darkgray 1.5px solid");
        mainDiv.append(title, aTag, button, hr);
        art.append(mainDiv);
    }
})

// $(".toSave").on("click", () => {
    
// })