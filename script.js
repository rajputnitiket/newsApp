const API_KEY = "b77a70920bb34f0cbc9cf8b7cc178495";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`)
    const data = await res.json();
    console.log(data.articles);
    bindData(data.articles);

}

function reload() {
    window.location.reload();
}

function bindData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemp = document.getElementById("temp-news-card");

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemp.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });


}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-tit");
    const newsSource = cardClone.querySelector("#news-src");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");

const searchText = document.getElementById("sinput");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;

});

