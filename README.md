🌍 WanderStay — Full-Stack website

A complete full-stack accommodation listing platform built using Node.js, Express, MongoDB, and EJS.

WanderStay is a full-featured  web application where users can browse places, create their own listings, edit or delete only their own properties, and interact through a simple and clean UI powered by Bootstrap and Bootstrap Icons.

The application uses server-side rendering with EJS, authentication with Passport.js, and robust error handling with custom middleware (ExpressError, wrapAsync).

⭐ Features
🔐 Authentication

Users can register and login using secure username/password.

Login is required for:

Adding a listing

Editing your own listing

Deleting your own listing

Unauthorized access is redirected with flash messages.

🏠 Listings

Users can:

Create a listing

Upload image URLs

Add price & description

Edit only their own listings

Delete only their own listings

Listings show:

Title

Location

Price

Image

Owner

💬 Flash Messages

Success and error messages displayed using connect-flash on:

Login success

Logout

Listing created

Listing edited

Permission denied

Errors (e.g., invalid credentials, validation errors)

🛡️ Error Handling

Custom error handling system includes:

✔ ExpressError custom class
✔ wrapAsync utility for error-handling async functions
✔ Global error middleware
✔ Fires a clean EJS error page with message + status code

🎨 UI & Frontend

Built entirely with EJS Templates

Styling via Bootstrap 5

Icons via Bootstrap Icons

Responsive layout for listings grid

🧰 Tech Stack
Frontend

EJS

Bootstrap 5

Bootstrap Icons

Custom CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

Passport.js (local strategy)

Express-session

Connect-flash

Method-override

Custom middlewares

Tools & Utilities

dotenv (environment config)

nodemon

express-validator 

🚀 How to Run Locally
1️⃣ Clone the Project
git clone https://github.com/your-username/wanderstay.git
cd wanderstay

2️⃣ Install Dependencies
npm install

3️⃣ Create a .env file
MONGO_URL=mongodb://127.0.0.1:27017/wanderstay
SECRET="yoursecret"

4️⃣ Run the Server
nodemon app.js


App runs at:

http://localhost:3000

🔑 Authentication Rules
Action	Login Required?	Owner Required?
View listings	❌ No	❌ No
Create listing	✔ Yes	❌ No
Edit listing	✔ Yes	✔ Yes
Delete listing	✔ Yes	✔ Yes
Login/Register	❌ No	❌ No

Unauthorized actions show flash messages like:

"You must be logged in!"

"You do not have permission!"

📸 Screenshots

To add images, upload them to GitHub → copy image link → replace links below.

🏠 Home Page

🏘️ Listings Page

✏️ Edit Listing Page

🔐 Login Page

🔮 Future Improvements

Cloud image upload (Cloudinary)

Maps (Mapbox / Google Maps)

Advanced search & filters

Wishlist / Favorites

Reviews & star ratings

Booking calendar system

Chat between guests & hosts

🤝 Contributing

Pull requests are welcome!
For major changes, open an issue first.

⭐ Support

If you like this project, please ⭐ the repo — it helps a lot!

Made with ❤️ using Node.js, Express, MongoDB, EJS & Bootstrap
