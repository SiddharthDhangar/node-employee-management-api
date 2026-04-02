<img width="1206" height="420" alt="image" src="https://github.com/user-attachments/assets/e5c5fe42-4a83-4da9-bc8e-6390f0a5a96e" /><img width="1206" height="420" alt="image" src="https://github.com/user-attachments/assets/2e44f06b-95cd-42b2-8074-3da3fcdcacce" /># 🧑‍💼 Employee Management API

A robust and scalable **RESTful API** built using **Node.js**, **Express**, and **MongoDB**.
This project provides complete backend functionality for managing **Employees and Departments**, with support for **CRUD operations, relationship mapping, and advanced filtering using query parameters**.

---

## 🚀 Features

* 🔧 **CRUD Operations**

  * Create, Read, Update, Delete for Employees and Departments

* 🔗 **Relationship Handling**

  * Employee ↔ Department mapping using **ObjectId**
  * Uses `departmentCode` to fetch and map department automatically

* 🔍 **Advanced Filtering**

  * Filter employees using query parameters:

    * First Name
    * Last Name
    * Department Code (single & multiple)

* 📡 **RESTful API Design**

  * Clean and structured API endpoints

* ⚡ **Dynamic Query Handling**

  * Flexible filtering using `req.query`

* 🛡️ **Validation & Error Handling**

  * Proper status codes (200, 400, 404, 500)
  * Email, Phone, and required field validations

* 🔐 **Environment Configuration**

  * Secure handling of sensitive data using `.env`

* 🧪 **API Testing**

  * All endpoints tested using Postman

---

## 🧠 How It Works

* Express handles routing and middleware
* MongoDB stores data using Mongoose models
* Employee stores `department` as ObjectId reference
* User sends `departmentCode`
* Backend converts `departmentCode → _id`
* Data is returned using `.populate("department")`
* Query parameters enable dynamic filtering of data
* Responses are sent in JSON format

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Environment Management:** dotenv
* **API Testing:** Postman

---

## 📂 Project Structure

```
employee-management-api/
│── models/
│   ├── employee.model.js
│   ├── department.model.js
│
│── routes/
│   ├── employee.routes.js
│   ├── department.routes.js
│
│── server.js
│── db.js
│── .env
│── .gitignore
│── package.json

```

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/employee-management-api.git
cd employee-management-api
npm install
nodemon server.js
```

---

## 🔐 Environment Variables

```
PORT=3000
MONGO_URL=your_mongodb_connection_string

```

---

### 🔹 Base URL

```
http://localhost:3000
```

---

## 🌐 API Endpoints

### 👤 Employee

* **POST /employee** → Create employee
* **GET /employee** → Get all employees
* **GET /employee?departmentCode=BE001** → Filter by department
* **GET /employee?departmentCode=BE001,FE001** → Multi filter
* **PUT /employee/:id** → Update employee
* **DELETE /employee/:id** → Delete employee

---

### 🏢 Department

* **POST /department** → Create department
* **GET /department** → Get all departments
* **GET /department?departmentName=IT** → Filter
* **PUT /department/:departmentCode** → Update department
* **DELETE /department/:id** → Delete department

---

## 📊 Data Models

### 👤 Employee

* `firstName` → String (required)
* `lastName` → String (required)
* `email` → String (required, unique, lowercase)
* `phone` → String (10 digit required)
* `age` → Number
* `department` → ObjectId (ref: Department)
* `salary` → Number (required)
* `isActive` → Boolean (default: true)
* `joiningDate` → Date (default: now)

#### Example:

```json
{
  "firstName": "Rohit",
  "lastName": "Patil",
  "email": "rohit.patil@company.com",
  "phone": "1234567890",
  "departmentCode": "BE001",
  "salary": 75000
}
```
### 🔍 Example After Mapping (Clear View)

**Input (User sends):**

```json
{
  "firstName": "Rohit",
  "lastName": "Patil",
  "email": "rohit.patil@company.com",
  "phone": "1234567890",
  "departmentCode": "BE001",
  "salary": 75000
}
```

---

**Output (After Backend Processing & Populate):**

```json
{
  "firstName": "Rohit",
  "lastName": "Patil",
  "email": "rohit.patil@company.com",
  "phone": "1234567890",

  "department": {
    "_id": "69cdfcb3fe10c21b127f9984",
    "departmentName": "Backend Development",
    "departmentCode": "BE001",
    "location": "Head Office"
  },

  "salary": 75000,
  "isActive": true,
  "joiningDate": "2026-04-01T18:30:00.000Z",
  "createdAt": "2026-04-01T18:30:00.000Z",
  "updatedAt": "2026-04-01T18:30:00.000Z"
}
```

👉 **Note:**

* `department` field is populated from the Department collection
* `salary`, `isActive`, `joiningDate`, `createdAt`, `updatedAt` belong to the Employee model


### 🏢 Department

* `departmentName` → String (required)
* `departmentCode` → String (required, unique)
* `location` → String (default: Head Office)

#### Example:

```json
{
  "departmentName": "Backend Development",
  "departmentCode": "BE001"
}
```

## 📊 Data Representation (Tables)

### 🏢 Department Table

| Department Name        | Department Code | Location    |
| ---------------------- | --------------- | ----------- |
| Backend Development    | BE001           | Head Office |
| Frontend Development   | FE001           | Mumbai      |
| Full Stack Development | FS001           | Head Office |

---

### 👤 Employee Table

| First Name | Last Name | Email                    | Phone      | Dept Code | Salary | Active | Joining Date | Created At | Updated At |
|-----------|----------|--------------------------|-----------|----------|--------|--------|-------------|------------|------------     |
| Rohit     | Patil    | rohit.patil@company.com  | 1234567890 | BE001    | 75000  | true   | 2026-04-01  | 2026-04-01 | 2026-04-01     |
| Priya     | Shah     | priya.shah@company.com   | 1234567891 | FE001    | 68000  | true   | 2026-04-02  | 2026-04-02 | 2026-04-02     |
| Aman      | Verma    | aman.verma@company.com   | 1234567892 | FS001    | 90000  | true   | 2026-04-03  | 2026-04-03 | 2026-04-03     |



## 💡 Key Highlights

* Clean modular architecture
* Real-world relationship mapping
* Query-based filtering
* Production-ready validation logic
* Scalable backend design

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
