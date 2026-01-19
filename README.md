# LangLearn

[My Notes](notes.md)

A language learning app that gives control back to you. For free.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Learning a new language can be expensive. There are so many platforms that all want you to pay a monthly subscription fee, just to offer a service that could create myself. LangLearn allows you to study flashcards, watch youtube videos, and more, while secretly remembering the words you have learned in the background. It also provides a spaced review option that allows you to practice words you espeically want to learn.

### Design

![Design image](UI.jpeg)

Login Page: Access your account
Friends Page: See what your friends are/were studying.
Flashcards Page: Study a predefined deck of flashcards.
Spaced Review Page: Study the flashcards that you don't know as well. (auto-generated)
Youtube Page: Watch youtube videos with the captions below. You can click on captions to see a definition.
Explore Decks Page: Allows you to find decks created/used by other users.


### Key features

- Study YouTube or Flashcard decks, while the program finds out what words you don't know as well.
- Spaced Reptition uses the SM-2 algorithm to find out what flashcards need to be studied the most. This allows you to review the words right when you might forget them.
- See what your friends are studying!

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - HTML will structure all pages of the website. I will have an HTML page for Login, Flashcards, Explore, YouTube, Friends, and Spaced Review.
- **CSS** - Will make the website look nice! I will also implement a card flipping animation.
- **React** - This will manage the application state. One place I will use React is for the flashcards page. React will keep track of what flashcard I am on as I flip through all of them!
- **Service** - Backend endpoints will be serving the customers custom flashcard decks, spaced review decks, and YouTube video metadata.
- **DB/Login** - I will have a Database to keep track of each users learned words, as well as each flashcard deck. There will be a login page that allows users to authenticate so that they can make changes to the database.
- **WebSocket** - I will use WebSockets on the Friend page. I will set it up so that the user will see real time updates on what their friends are studying.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://claytonstallings.com).

[Description can be found here](notes.md#aws)


## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - created 4 html pages. index.html, friends.html, browse.html, and study.html.
- [x] **Proper HTML element usage** - I spent a lot of time learning about HTML. I used header, footer, main, nav, a, button, form, and more.
- [x] **Links** - The header contains links to all pages.
- [x] **Text** - All pages have text
- [x] **3rd party API placeholder** - The study.html page contains a time at the botton. I will query a 3rd party API that gets EXACT time.
- [x] **Images** - LangLearn photo is beneath the log on. this is at index.html.
- [x] **Login placeholder** - located at index.html
- [x] **DB data placeholder** - DB will store the card deck information. Card data is the db data. See the place holder at study.html.
- [x] **WebSocket placeholder** - The friends.html page contains friend info. This will be updated live with what the friends are currently studying, or when they were last online. This currently has websocket placeholder info in it.

<!-- 
## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable. -->
