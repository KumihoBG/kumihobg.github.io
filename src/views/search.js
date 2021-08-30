import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchItem } from "../api/data.js";


const searchTemplate = () => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" id="searchBtn">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">

    </div>
</section>`;

const foundTemplate = (data) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" id="searchBtn">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
        ${data.map(c => singleItem(c))};
    </div>
</section>`;

export async function searchPage(context) {
    context.render(searchTemplate());
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', onSearch);
    const searchParams = context.querystring.split('=')[1];

    if (searchParams !== undefined) {
        const data = await searchItem(searchParams);
        const isEmpty = data.length <= 0;

        context.render(searchTemplate());
        const parent = document.querySelector('.listings');

        if (isEmpty) {
            const p = document.createElement('p');
            p.textContent = 'No results.';
            p.classList.add('no-cars');
            parent.appendChild(p);
        } else {
            context.render(foundTemplate(data));
        }

    }

    function onSearch() {
        const searchInput = encodeURIComponent(document.getElementById('search-input').value);
        context.page.redirect(`/search?search=${searchInput}`);
    }
}
