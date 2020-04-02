export default {
  template: `
    <section class="home-page-container">
    
        <div class="home-note home-card">
            <h2> New place to save your thoughts </h2>
            <p> Capture what’s on your mind. Add notes, lists, photos, and audio to Keep.
                Everything you add to Keep syncs across your devices so your important stuff is always with you. </p>
            <router-link to="missKeep" class="home-page-link home-keeper-link">
                Check it out
            </router-link>     
        </div>

        <div class="home-email home-card">
            <h2> Meet your new Email inbox </h2>
            <p> New customizable tabs put you back in control so 
                that you can see what’s new at a glance and decide which emails you want to read and when.</p>
        <router-link to="email/list" class="home-page-link home-email-link">
                Check it out
            </router-link>  
        </div>

        <div class="home-books home-card">
            <h2> THE BEST BOOKSTORE ONLINE </h2>
            <p> Over 6 million books ready for shipment within 24 hours and 3.2 million eBooks to download now. </p>
            <router-link to="books" class="home-page-link home-book-link">
                Shop now
            </router-link> 
        </div>

    </section>
    `
}
