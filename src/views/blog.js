import {html} from 'https://unpkg.com/lit-html?module';

const infoTemplate = () => html`
     <section class="tabs">
      <div class="tab-main-container">
        <div id="tab-1" class="tab-item tab-border">
          <i class="fas fa-blog fa-2x"></i>
          <p class="hide-sm glow-start glow-end">Blog</p>
        </div>

        <div id="tab-2" class="tab-item">
          <i class="fas fa-id-card fa-2x"></i>
          <p class="hide-sm glow-start glow-end">My Bio</p>
        </div>

        <div id="tab-3" class="tab-item">
          <i class="fas fa-calendar-alt fa-2x"></i>
          <p class="hide-sm glow-start glow-end">Events</p>
        </div>
      </div>
    </section>

    <!--Tab content-->
    <section class="tab-content">
      <div class="tab-content-container">

        <!-- Tab Content 1 -->
        <div id="tab-1-content" class="tab-content-item show">
          <!--Blog section-->
          <section class="main-post">
            <div class="main-post-container">
              <article id="actual-post">
                <h3>Top 3 reasons <br>which can make you quit writing</h3>
                <p>Every writer lives in a different world - a dream world in which he sells millions of copies of his
                  book and happily gives autographs to each of his admirers everywhere they meet him. A world where even
                  Hollywood doesn't sound weird, to say the least. In this alternate reality, writing goes <strong>"like
                    water"</strong>. Carried on the wings of inspiration, filled with intoxication from the coming
                  glory, the writer creates without fear and hesitation… because success lurks around the corner. He
                  knows it, he feels it! His work will cause a furor! It will cause a change in people, it will make
                  them better, it will change their destinies even… when they see the message contained between the
                  lines of his book…</p>

                <p>But a day is coming when this utopian world is slowly melting before the writer's eyes. Why? Well,
                  because he has reached a certain point where he wants to continue but he finds neither help nor
                  understanding from the world. <strong>Reasons?</strong> There are plenty of reasons. Let me share my
                  <strong>Top 3:</strong>
                </p>
                <img src="images/problems-1.png" alt="Kumiho's blog">
                <p><strong>Reason one:</strong> The manuscript is complete, but where to now? Like everyone else, I got
                  to this point and blocked for a while. Finally, I took matters into my own hands and started reading
                  and looking for information about what is happening to writers in our home country and how they manage
                  to break into the market. I was not fascinated by my discoveries, which could lead any debilitated
                  person to depression. I decided not to give up and started looking for a publisher that would approve
                  my work for publication. Because (remember?) there was a plan to become famous and now there is no
                  time to lose! But, alas! I have no acquaintances who work in the field of editorial / publishing
                  services, nor an idea of ​​which publishing house has focused on which genre and which manuscripts it
                  accepts (and if it accepts them at all, does it read them or somebody just presses delete on the
                  keyboard?). I've heard that there are literary agencies that take that burden off your shoulders and
                  help you sign a publishing contract, but for now I've decided to skip them and complete this mission
                  on my own. After some time, I found a publishing house and boldly sent the whole set of documents: a
                  short synopsis of the book, a cover letter, a short autobiography in which I had to admit the
                  following:</p>
                <ul>
                  <li>I have no previous experience in the field of book publishing</li>
                  <li>None of my work has been published so far</li>
                  <li>I have no recommendations from other authors</li>
                </ul>
                <img src="images/problems-3.png" alt="Kumiho's blog">
                <p>It all sounds sinister, but what I had to do? Lie? Anyway, I also sent the manuscript itself. I
                  wondered: should I send it whole or just excerpts from it? Finally, I decided I had nothing to worry
                  about and cheerfully pressed the "Send" button. This happened on November 16, 2018. The publisher's
                  website said that the answer is supposed to be given within three months and only if approved. A quiet
                  voice in my head immediately resented this injustice, but I silenced it and armed myself with
                  patience. And so I remained calm until the end of January.</p>
                <p>A few days ago, while I was drinking my coffee at the kitchen table and getting ready for work, I
                  suddenly got an insight and my eyes finally opened to the cruel truth - they probably won't approve of
                  my manuscript! But why? Isn't it great, the idea is good, unique even… who would refuse to publish
                  such a wonderful work? And then I remembered that my work was actually planned as part of a trilogy
                  and that only the first book would be in the range of 500-600 standard pages. Obviously, the publisher
                  doesn't want to take a risk with a novice writer who doesn't even provide a truly finished work! From
                  here comes my first piece of advice to you - let your first work be shorter - so the possibility of
                  approval is going to be greater, and the cost of publishing is supposed to be lower. Don't take risks,
                  don't waste time writing long novels, like I did. Apparently such manuscripts are an investment with
                  an unknown financial result, do you get me?</p>
                <img src="images/problems-4.png" alt="Kumiho's blog">
                <a id="go-back-up" href="#actual-post2"><i class="fas fa-arrow-alt-circle-up"></i> Keep reading...</a>
              </article>
              <article id="actual-post2">
                <p>After accepting the idea that I might not be approved for publication, I thought about something else
                  - why is there this practice of tacitly rejecting manuscripts? Stephen King had said in an interview
                  that the writer should never be afraid of rejection, that he would receive many rejections, that he
                  had to get used to them, accept them and look for a new way to publish his book. But what happens if
                  we don't get a rejection at all, or even a response from the publishers? Uncertainty scares more. I
                  could not help but make a comparison with the APC (for those who do not know what it is, it is the
                  Administrative Procedure Code of the Republic of Bulgaria), namely with Art. 58. (1) "The
                  non-pronouncement in term shall be considered as a tacit refusal to issue the act.”, with the
                  difference that the law gives you the right to appeal the tacit refusal before the court. There is
                  some justice, isn't there? And where could I appeal the silent rejection of my book by the publishers?
                  Nowhere.</p>
                <p>Although it is a voice in the desert, my suggestion to publishers is to introduce a new, more
                  respectful practice. We all know that they are extremely busy and do not have time to correspond, but
                  one short sentence like: "Sorry, but your manuscript was rejected by our publisher!" it would help the
                  author immensely so that he could move forward and seek his fortune elsewhere, rather than wasting
                  time in vain hopes and waiting for an answer. I worked in the banking sector once. There, employees
                  are overwhelmed by documentation, but will always find time to answer a phone call, letter or e-mail.
                  Is their work less important than that of the publishers? And where do they find the time to do this
                  unpleasant job then? Although I am rejected, I would like this to be done with respect for me and my
                  work. Thanks in advance!</p>
                <p><strong>Reason two:</strong> I don't get a response from a publisher, then what? My second step would
                  logically be to send my manuscript to another publisher in the hope that it would be interested in it.
                  But I don't want to start sending it indiscriminately left and right, nor do I think it's the right
                  thing to do. In the meantime, I became interested in the conditions of self-publication, but the
                  result of my research will be the subject of a separate article. Yes, self-publishing might be a great
                  idea!What can stop you from writing and publishing a book in this case is the lack of funds. You will
                  have to pay experts to edit the manuscript, proofread, book paging, cover design, illustration (if
                  any) and print the book. Or maybe you want to advertise it? This will cost extra.</p>
                <img src="images/problems-5.png" alt="Kumiho's blog">
                <p><strong>Reason three:</strong> my family doesn't support me enough, what should I do? Has it happened
                  to you? All loved ones enjoy your work and inspiration, but that is the end of their support. They
                  have their own worries - work, household, children, debts, hobbies. You and your writing are like a
                  cockroach in a face cream - strange and out of place in their harsh reality. They pat you on the
                  shoulder, brag to acquaintances, but don't really do anything to help. On the contrary, they do not
                  give you time to indulge in writing alone, or they directly bring you down to earth with a line like:
                  “Don't bother so much! There is no profit from writing books in Bulgaria anyway! Yu must have
                  connections in order to succeed in our country!” They accept your writing as a waste of time, as
                  madness and a vain dream. My advice is, don't listen to them and don't let them affect you negatively.
                  If you are familiar with the law of attraction and the so-called <strong>vibrations</strong>, then
                  know that if you do not do something and do not protect yourself, you will undoubtedly be absorbed by
                  others negative energy. No, they are not energy vampires (though… are they?), but they are realistic
                  and think that you should find a decent job, and not knock on the keyboard, like a bully, all day.
                  Still, <strong>keep going</strong>! Let their words be an incentive for you to succeed and prove to
                  them that they were wrong! Believe in yourself! When you get another dose of sarcasm, just don't
                  answer! Stretch your back, take a deep breath, hold your breath and exhale! This will calm your
                  thoughts and give you the opportunity to project the dream reality, not to immerse yourself in their
                  world and negativity! Make a plan, create your own guide to success! Have a goal and follow it
                  steadily! <strong>Fighting!</strong>
                  <br>
                  February, 2019
                </p>
                <img src="images/problems-2.png" alt="Kumiho's blog">
              </article>
            </div>
          </section>

        </div>

        <!-- Tab Content 2-->
        <div id="tab-2-content" class="tab-content-item">
          <div class="tab-2-content-inner">
            <div class="fb-plugin">
              <iframe></iframe>
            </div>
          </div>
        </div>

        <!-- Tab Content 3 -->
        <div id="tab-3-content" class="tab-content-item">
          <div class="tab-3-event-inner">
            <h3>There are currently no scheduled events.</h3>
            <h5>Follow Kumiho on <a href="#" class="glow-start glow-end">Facebook</a> and <a href="#"
                class="glow-start glow-end">Instagram.</a></h5>
          </div>
        </div>
      </div>
    </section>`;

export async function infoPage(context) {
    const userId = sessionStorage.getItem("userId");
    context.render(infoTemplate(userId != null));
}

const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

// Select tab content item
function selectItem(e) {
	// Remove all show and border classes
	removeBorder();
	removeShow();
	// Add border to current tab item
	this.classList.add('tab-border');
	// Grab content item from DOM
	const tabContentItem = document.querySelector(`#${this.id}-content`);
	// Add show class
	tabContentItem.classList.add('show');
}

// Remove bottom borders from all tab items
function removeBorder() {
	tabItems.forEach(item => {
		item.classList.remove('tab-border');
	});
}

// Remove show class from all content items
function removeShow() {
	tabContentItems.forEach(item => {
		item.classList.remove('show');
	});
}

// Listen for tab item click
tabItems.forEach(item => {
	item.addEventListener('click', selectItem);
});

