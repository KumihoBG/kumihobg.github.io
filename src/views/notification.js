import { html, render } from "../../node_modules/lit-html/lit-html.js";
let container = document.getElementById('notifications');

const notificationTemplate = (message) => html`
<div id="messageBox" class="notification">
    <span>${message}</span>
</div>`;

export function notify(message){
    render(notificationTemplate(message), container);
    setTimeout(clearNotify, 3000);
}

export function clearNotify() {
    render('', container);
}