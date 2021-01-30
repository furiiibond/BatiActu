
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


readTextFile("./article.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    console.log(data.response.docs);
    data.response.docs.forEach(element => addToArticleView(element));
    addToArticleView(data.response.docs);
});

var nbarticleInline=0;

function addToArticleView(article){
    //if (nbarticleInline>2)
    var articleView= document.getElementById("articleView");
    var articleToAdd = document.createElement("article",);
    articleToAdd.className = "col-md-4";

    var img = document.createElement("img");
    img.src=article.sm_image_url[0];
    articleToAdd.append(img);

    var date = document.createElement("h5");
    date.append(article.ds_pub.split('T')[0]);
    //articleToAdd.append(date);

    var title = document.createElement("h3");
    title.append(article.label);
    articleToAdd.append(title);

    var text = document.createElement("p");
    text.append(article.teaser);
    articleToAdd.append(text);

    articleToAdd.onclick=  function() { window.location.href = article.path; };

    articleView.appendChild(articleToAdd);
}



