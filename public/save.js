if (localStorage.getItem('articles') == null){
    console.log("no work");
} else {
    renderArticles();
}

function renderArticles(){
    console.log(localStorage.getItem('articles'))
}