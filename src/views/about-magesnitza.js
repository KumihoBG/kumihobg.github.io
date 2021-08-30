import {html} from 'https://unpkg.com/lit-html?module';
import { logoutEvent } from "../../index.js";
import { footerTemplate } from "./footer.js";
import { navTemplate, setUserNav } from "./navigation.js";
import { notify } from "./notification.js";

const aboutBookTemplate = (submitForm) => html`
${navTemplate()}
<section class="my-book">
    <div class="my-book-container">
        <div id="sinopsis">
            <h1 id="page-info">Magesnitza - Fantasy Novel by Kumiho </h1>
            <h3>How it all began...</h3>
            <p class="text-light">The story of my characters came to life on a December evening in 2015, when I least
                expected it. Just as most good ideas come to us by chance, so my characters began to live their
                mysterious
                lives in my mind as I stood and meekly rummaged through the Internet. For a while, I felt an inner sense
                of
                dissatisfaction with my current job, as if it were an absolute waste of time. I needed a change. I
                wanted to
                escape from my daily life. I needed something different because everything inside me was screaming that
                I
                had more to contribute to my life. And so, without thinking much about it, I created an empty file and
                the
                words began to flow on their own - as if they were always there, but not written. And I love to write. I
                always knew that.</p>
            <p class="text-light">This passion served me well in school and then at work while I was still practicing
                law.
                But what came out as the end result of my work was not enough for me. I wanted more. I wanted to show
                more
                of myself, to share my imagination, not just to apply the law. I wanted to create something unique and
                weave
                as much emotion into it as possible. I wanted to give free rein to my heart. Writing for me was another
                reality - that of possible things, because in the book you can be anyone and everything. You have a
                world to
                immerse yourself in, to merge with, and to experience all that life really robs you of.</p>
            <p class="text-light">This book is the beginning of my adventure, which I want to experience together with
                you. It follows the experiences of my main character - Alexandra Borisova (Lexi). She behaves a lot like
                me,
                but she's not me. She is everything I dreamed to be one day, but I failed. In general, if you get
                acquainted
                with the book, you will witness a journey through time. You will find that in the past people still
                believed
                in miracles, spells and incantations. You will meet immortal beings and you will remember the glorious
                past.
                This is a fantasy story. Don't analyze and compare it to the truth, because it's just a fabrication I
                chose
                to believe.</p>
            <h3>Why did I write that book?</h3>
            <p class="text-light">To dedicate it to you - to all those who still believe in old traditions and magical
                customs, and who still have the courage to dream and be inspired by history in our lands. I dream of
                Bulgarians realizing how much power lies in themselves, how much they are able to change their world and
                how
                much they should be proud of their rich past, myths and legends. I do not claim historical accuracy of
                the
                events described or touched upon in my story. Some of the characters, such as Bayan the Magician, were
                actually personalities who became the subject of many historical and artistic works. The historical
                personality of Prince Veneamin-Boyan was transformed by a number of Bulgarian authors into an artistic
                image
                long before I decided to write this fantastic story. All the other characters are completely made up by
                me,
                but they are also based on what I have read: Bulgarian myths, legends and stories. Princess Boyana, the
                warriors of light, the fairies - they all come to life in my imagination to express my childhood belief
                that
                somewhere there, among us, wander invisible to us forces. Much of the information about my characters I
                have
                gathered from the Internet - forums, blogs, articles and comments. I am grateful to all who have donated
                their time and effort to share with us the valuable information that ultimately aroused my desire to
                tell
                you my tale of another possible world - the world of love, magic and adventure. I hope you like the
                book.
            </p>
            <div id="book-cover">
                <h3>A short excerpt from the book...</h3>
                <p class="text-light">"Some say that when danger strikes you with furious speed, time seems to stop and
                    that
                    your mind perceives what is happening at a slow pace. However, time did not stop, did not slow down,
                    did
                    not
                    bring deliverance. One last gasp of surprise and that's it. She had no time to react at that moment.
                    It
                    felt
                    as if she had been in a huge blender and someone had pushed the button to turn it on. It was like a
                    rag
                    doll
                    thrown by a bored child. No form of control over the situation. The pain of the blow was so
                    excruciating
                    that the second blow to the ground was barely felt.</p>
                <p class="text-light">For a split second, her brain tried to assimilate, but to no avail. Somewhere in
                    the
                    background, she could still hear Sting dreaming of his desert rose: "I dream of rain, I dream of
                    gardens
                    in
                    the desert sand, I wake in pain, I dream of love as time runs through my hand...“.
                    Her body flew several meters and landed awkwardly on the ground with unnaturally curled limbs. The
                    blood
                    slowly made its way onto the wet asphalt and formed small puddles, mingling with the October rain.

                    Then came the darkness and blissful numbness."</p>
            </div>
        </div>
        <!--Sidebar-->
        <aside id="sidebar">
            <div class="get-in-touch">
                <div id="icons-container">
                    <a target="_blank" href="#"><i id="facebook" class="fab fa-facebook fa-2x"></i>
                    </a><a target="_blank" href="#"><i id="twitter" class="fab fa-twitter fa-2x"></i></a>
                    <a target="_blank" href="#"><i id="instagram" class="fab fa-instagram fa-2x"></i></a>
                </div>

                <h3>Get In touch</h3>
                <form @submit=${submitForm} action="https://formsubmit.co/pavleta.taseva@email.com" id="contact-form" method="POST" class="quote">
                    <div>
                        <input id="form-name" type="text" name="name" placeholder="Name">
                    </div>
                    <div>
                        <input id="form-email" type="email" name="email" placeholder="Email Address">
                    </div>
                    <div>
                        <textarea id="form-message" name="message" placeholder="Message"></textarea>
                    </div>
                    <input type="text" name="_honey" style="display:none">
                    <button class="post-button" type="submit">Send</button>
                </form>
            </div>

            <h4 class="news">
                <i class="fas fa-feather-alt fa-2px"></i> Latest News
            </h4>

            <div id="book-cover">
                <h1>Magesnitza<br>Now available</h1>
                <img src="images/book-cover.png" alt="Magesnitza Book">
                <a href="#" class="btn primary-btn">Order Now</a>
            </div>
        </aside>
    </div>
</section>
${footerTemplate()}`;

export async function aboutBookPage(context) {
    const userId = sessionStorage.getItem("userId");
    context.render(aboutBookTemplate(userId != null, submitForm));
    setUserNav();
    logoutEvent();
   
    // Get input values
    function submitForm(e) {
        e.preventDefault();
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;
        document.getElementById('contact-form').reset();
        if (name == '' || email == '' || message == '') {
            notify('All fields are required!');
            return;
        }
        notify('Your message has been sent successfully. Thank you! :) ')
        // sendEmail(name, email, message);
    }
}
    // Send email 
//     function sendEmail(name, email, message) {
//         Email.send({
//             Host: 'smtp.gmail.com',
//             Username: 'pavleta.taseva@gmail.com',
//             Password: 'erpdewgatbpeazkk',
//             To: 'pavleta.taseva@gmail.com',
//             From: 'pavleta.taseva@gmail.com',
//             Subject: `${name} sent you a message`,
//             Body: `Name: ${name} <br> Email: ${email} <br> ${message}`
//         }).then(message => notify('Your message was sent successfully.'));
//     }

