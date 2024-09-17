[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AHFn7Vbn)
# Superjoin Hiring Assignment

### Welcome to Superjoin's hiring assignment! 🚀

### Objective
Build a solution that enables real-time synchronization of data between a Google Sheet and a specified database (e.g., MySQL, PostgreSQL). The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement
Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:
1. Real-time Synchronisation
  - Implement a system that detects changes in Google Sheets and updates the database accordingly.
   - Similarly, detect changes in the database and update the Google Sheet.
  2.	CRUD Operations
   - Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
   - Maintain data consistency across both platforms.
   
### Optional Challenges (This is not mandatory):
1. Conflict Handling
- Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
- Provide options for conflict resolution (e.g., last write wins, user-defined rules).
    
2. Scalability: 	
- Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
- Optimize for scalability and efficiency.

## Submission ⏰
The timeline for this submission is: **Next 2 days**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)
- Use ChatGPT4o/o1/Github Co-pilot, anything that accelerates how you work 💪🏽. 

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I have even solved some edge cases (brownie points) 💪
- [x] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get some help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore? 😛

We're available at techhiring@superjoin.ai for all queries. 

All the best ✨.

## Developer's Section
Uff 😮‍💨 So You Finally Landed Here! Get ready and sit your tight because you're about to dive into the nitty-gritty of how this real-time synchronization system between Google Sheets and a PostgreSQL database works. Let's break down the components, APIs, and the overall architecture that make this magic happen! 🚀

## Project Structure
Here's a quick overview of the project's file structure to help you navigate through the codebase:
<img width="604" alt="Screenshot 2024-09-16 at 10 17 46 AM" src="https://github.com/user-attachments/assets/43f4d966-3253-41b3-8aa8-0cb3ae3fd2cd">


## API Endpoints

We've set up a RESTful API using Express.js to handle CRUD operations and synchronization tasks. Here's a rundown of the available endpoints:

### Student Endpoints

#### Get All Students
- **URL**: `/students`
- **Method**: `GET`
- **Description**: Retrieves a list of all students from the PostgreSQL database.

#### Add a New Student
- **URL**: `/students`
- **Method**: `POST`
- **Description**: Adds a new student to the database. Expects `name`, `email`, `course`, and `grade` in the request body.

#### Update an Existing Student
- **URL**: `/students/:email`
- **Method**: `PUT`
- **Description**: Updates the details of an existing student identified by their email. Expects `name`, `course`, and `grade` in the request body.

#### Delete a Student
- **URL**: `/students/:email`
- **Method**: `DELETE`
- **Description**: Deletes a student from the database based on their email.

### Connect to Google Sheet

#### Connect to Google Sheet
- **URL**: `/students/connect`
- **Method**: `POST`
- **Description**: Connects the application to a specified Google Sheet by setting the `spreadsheetId`. Expects `spreadsheetId` in the request body.

### Synchronization Endpoints

#### Sync Google Sheets to Database
- **URL**: `/sync`
- **Method**: `GET`
- **Description**: Triggers synchronization of data from Google Sheets to the PostgreSQL database.

#### Sync Database to Google Sheets
- **URL**: `/sync-db`
- **Method**: `GET`
- **Description**: Triggers synchronization of data from the PostgreSQL database to Google Sheets.

# How It All Comes Together

## Initialization:
- When the application starts, `app.js` initializes the Express server and sets up Socket.IO for real-time communication.
- It also ensures the students table exists in the PostgreSQL database by invoking `studentModel.createTable()`.

## API Interaction:
- Clients interact with the system via the defined RESTful APIs to perform CRUD operations on student records.
- Each operation emits real-time events (`newStudent`, `updateStudent`, `deleteStudent`) through Socket.IO to notify connected clients of changes.

## Google Sheets Synchronization:
- The system can connect to a specified Google Sheet using the `/students/connect` endpoint.
- Synchronization can be manually triggered via the `/sync` and `/sync-db` endpoints or automatically scheduled to run every minute using `node-schedule`.
- The synchronization ensures that any changes in the Google Sheet are reflected in the database and vice versa, maintaining data consistency.

## Real-Time Updates:
- With Socket.IO integrated, any changes to the student data (additions, updates, deletions) are immediately broadcasted to all connected clients, ensuring everyone has the most up-to-date information without needing to refresh.

---

# Approach

## The core objective:
To create a seamless and real-time synchronization system between Google Sheets and a PostgreSQL database, facilitating efficient data management for businesses that rely on both platforms. Here's how the solution was approached:

### Modular Design:
- **Separation of Concerns**: Each functionality was encapsulated within its module (e.g., database operations, Google Sheets interactions, synchronization logic) to enhance maintainability and scalability.

### Robust Synchronization Mechanism:
- **Bidirectional Sync**: Developed synchronization services that handle data flow from Google Sheets to the database and vice versa, ensuring data consistency across both platforms.
- **Conflict Management**: While not fully implemented, the foundation is laid out to handle potential conflicts, such as concurrent edits in both systems.

### Scheduling and Automation:
- **Automated Syncing**: Utilized `node-schedule` to automate the synchronization process at regular intervals, reducing the need for manual triggers and ensuring data remains up-to-date.

### Error Handling and Logging:
- **Comprehensive Error Management**: Incorporated `try-catch` blocks and meaningful error messages to handle potential failures gracefully.
- **Logging**: Added console logs to track the synchronization process and identify issues promptly.

### Security Considerations:
- **Environment Variables**: Leveraged environment variables to manage sensitive information like database credentials and Google API keys, enhancing security.
- **Input Validation**: Ensured that all inputs, especially those interacting with the database and Google Sheets, are validated to prevent SQL injection and other security vulnerabilities.

### Scalability:
- **Efficient Database Connections**: Used connection pooling for the PostgreSQL database to manage multiple concurrent connections efficiently.
- **Optimized API Calls**: Designed the synchronization logic to minimize the number of API calls to Google Sheets, respecting rate limits and enhancing performance.

---

# Final Thoughts

This project showcases a robust system capable of bridging the gap between collaborative tools like Google Sheets and scalable databases like PostgreSQL. By automating the synchronization process and incorporating real-time updates, businesses can ensure data integrity, reduce manual errors, and enhance collaborative efforts.

Feel free to explore the code, suggest improvements, or reach out if you have any questions or feedback! Happy coding! 💻✨

---

# Checklist

- [x] My code's working just fine! 🥳
- [x] I have recorded a video showing it working and embedded it in the README ▶️
- [x] I have tested all the normal working cases 😎
- [x] I even solved some edge cases (brownie points) 💪
- [x] I added my very planned-out approach to the problem at the end of this README 📜

## Developer's Video
https://github.com/user-attachments/assets/6c8bdba6-8303-4c95-9421-2ba45de9b35c

# Contact

Developed by **Akib Vijapura** - feel free to reach out akibv93@gmail.com

---

# Acknowledgements

- **Google Sheets API**
- **Express.js**
- **Socket.IO**
- **node-schedule**
- **pg**
  
# 
This README was crafted with the assistance of ChatGPT. Special thanks to OpenAI! 🤖



