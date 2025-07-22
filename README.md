# 🚌 Online Transportation Booking System

   A comprehensive web application designed to simplify transportation service management and facilitate electronic trip bookings. This system offers a unified platform for passengers, drivers, and administrators to handle trips and reservations efficiently—reducing manual processes and improving trip coordination.

---

## ✨ Key Features

- Add, view, and update transportation services  
- Manage user profiles (passengers and drivers)  
- Browse available trips by date, time, and destination  
- Make, edit, or cancel trip bookings  
- Assign drivers and vehicles to scheduled trips  
- Admin dashboard to monitor bookings and trip availability

---

## 🛠 Technologies Used

- **Backend Framework:** Node.js  
- **Database:** XAMPP (MySQL)  
- **Architecture:** Model-View-Controller (MVC)

---

## ⚙️ How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Yaakoub-Bourekba/TransportBookingSystem.git
```
2. Navigate to the project directory: 
```
cd TransportBookingSystem
```
3. Install dependencies:
```
npm install
```
4. Run the development server:
```
npm run dev
```
5. Open your browser at:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
TransportBookingSystem/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── chauffeur.controller.js
│   ├── payment.controller.js
│   ├── reservation.controller.js
│   ├── service.controller.js
│   ├── trajet.controller.js
│   ├── transport.controller.js
│   └── user.controller.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── chauffeur.model.js
│   ├── payment.model.js
│   ├── reservation.model.js
│   ├── service.model.js
│   ├── trajet.model.js
│   ├── transport.model.js
│   └── user.model.js
│
├── public/
│   ├──
│   ├──
│   ├──
│   └──
│
├── routes/
│   ├── auth.routes.js
│   ├── chauffeur.routes.js
│   ├── payment.routes.js
│   ├── reservation.routes.js
│   ├── routes.js
│   ├── service.routes.js
│   ├── trajet.routes.js
│   ├── transport.routes.js
│   └── user.routes.js
│
├── utils/
│
├── views/
│   ├── admib-dashboard.html
│   ├── cachier-dashboard.html
│   ├── driver-dashboard.html
│   ├── home.html
│   ├── login_reg.html
│   ├── passenger-dashboard.html
│   └── reset.html
│
├── .env
├── package-lock.json
├── package.json
├── server.js
└── transportservicedb.sql  # SQL file for database setup
```

---

## 🧑‍💻 Contribution

1. Fork the repository
2. Create a new branch:
```
git checkout -b feature-name
```
3. Commit your changes:
```
git commit -m 'Add new feature'
```
4. Push to the branch:
```
git push origin feature-name
```
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

 ## 📌 Notes
 
- Future improvements could include a mobile-friendly version or SMS notifications for trip confirmations.
- The system can be expanded to support intercity transport or ride-sharing services.

---
