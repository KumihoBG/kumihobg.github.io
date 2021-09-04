import { html, render } from 'https://unpkg.com/lit-html?module';
let container = document.getElementById('notifications');

export const notificationTemplate = (message) => html`
        <div id="messageBox" class="notification">
            <span>${message}</span>
        </div>`;

export function notify(message) {
    container.style.display = "block";
    render(notificationTemplate(message), container);
    setTimeout(clearNotify, 5000);
}

export function clearNotify() {
    render('', container);
    container.style.display = "none";
}