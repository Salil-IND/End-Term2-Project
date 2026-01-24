# 🪙 PennyLogger 🪙

> A sassy, "no-nonsense" monthly expense-logger shit built purely with Vanilla JavaScript, HTML, and CSS. No frameworks, no databases, just pure DOM manipulation, `localStorage` magic and days of singing my eyeballs.

## 📖 About The Project

PennyLogger is a web-based application designed to help users track their monthly expenses. It allows users to log expenditure records, view them in a monthly timeline, and see a summary of all the records added.

This is for those whose lives have become terribly easy because of Microsoft Excel and who likes easy? Easy is for Losers. Hard is what Real developers do. The Real Dev way. 

Jokes apart, this was something "I" needed personally as replacement for Excel Sheets or Google Sheets for keeping track of my expenses as a student. 

## ✨ Features

* **Persistent Storage:** Uses `localStorage` so your data survives a page refresh.
* **Dynamic Year/Month Navigation:** Smooth slider animations between months.
* **CRUD Operations:** Add, Read, Update (inline editing), and Delete records.
* **Sassy UI:** Dark-themed, glass-morphism inspired design with "Spotlight" row highlighting.
* **Sidebar Summary:** Real-time calculation of total spending per year and month.
* **Smart Validation:** Prevents navigating to months that don't exist yet.

## 💀 The "Suffering" (Dev Diary)

*Or: "Why I will never take React for granted again."*

This project was built under the pressure of a looming deadline (Jan 26th) and End-Term Exams (Jan 28th), and let me tell you, it was a spiritual journey through the depths of JavaScript hell. Here is the toll it took:

1. **The "Unexpected Token" Incident:** I spent way too long debugging an error caused by the browser trying to read an HTML 404 page as a JavaScript file.
2. **The Boolean Shit:** I learned the hard way that in JavaScript, the string `"false"` is actually **true**. My navigation buttons stayed disabled for hours because of this.
3. **The Disappearing Months:** I accidentally overwrote my entire slider track inside a `forEach` loop because I forgot how `innerHTML` works.
4. **Manual DOM Surgery:** Updating the UI manually every time a single number changes? I now have a deep, personal respect for the Virtual DOM.
5. **Ghost Inputs:** I built a system where text inputs pretend to be regular text until you click them, just to avoid using `contenteditable`. It works, but at what cost?

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Grid)
* **Logic:** Vanilla JavaScript (ES6+)
* **Icons:** FontAwesome
* **Database:** LocalStorage (The poor man's Firebase)

## 📄 Usage

1. **Add a Record:** Select a date, enter an amount and reason at the top, and click `+ Add`.
2. **Edit a Record:** Click directly on the Amount or Reason in the table to edit it. Changes save automatically when you click away.
3. **Delete:** Hover over a row to reveal the Delete button.
4. **Navigate:** Use the arrow keys or the Year Dropdown to view different time periods.

## 📝 License

Distributed under the "I'm tired and I need a nap" License.

---

*Built with ❤️ and singed👀 by a First Year Student @ IIT Madras / Scaler School of Technology.*
