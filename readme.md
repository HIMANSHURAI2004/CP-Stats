# CP-Stats

CP-Stats is a web application that helps competitive programmers track their progress, analyze performance, and get real-time contest updates across multiple platforms like LeetCode and Codeforces.

## Live Demo

Check out the live version of the project here:  
🔗 [CP-stats Live](https://cp-stats-9dtp.onrender.com)

## Features

- **User Authentication:** Register using your LeetCode and Codeforces usernames.
- **Statistics Dashboard:** View your contest history, ratings, and problem-solving stats.
- **Recent Submissions:** See your latest problem submissions from both platforms.
- **Responsive UI:** Modern, mobile-friendly interface built with React and Tailwind CSS.

## Tech Stack

### Frontend
- *React.js* - Modern JavaScript library for building user interfaces
- *Tailwind CSS* - Utility-first CSS framework for styling
- *ShadCN UI* - Re-usable components built with Radix UI and Tailwind CSS
- *TanStack Query* (formerly React Query) - Powerful data synchronization for React
- *Vite* - Next generation frontend tooling

### Backend
- *Node.js* - JavaScript runtime environment
- *Express.js* - Fast, unopinionated web framework
- *JSON Web Token (JWT)* - Secure user authentication and authorization

### Key Features
- Server-state management with TanStack Query
- Modern UI components from ShadCN library
- Responsive design with Tailwind CSS
- Fast development and build times with Vite
- Secure authentication using JWT
- RESTful API architecture with Express.js



## Project Structure

```
render.yaml
Backend/
  ├── .env
  ├── package.json
  └── src/
      ├── app.js
      ├── constants.js
      ├── index.js
      ├── controllers/
      ├── httpRequests/
      ├── middlewares/
      ├── queries/
      ├── routes/
      └── utils/
Frontend/
  ├── .env
  ├── package.json
  ├── index.html
  ├── src/
      ├── App.jsx
      ├── main.jsx
      ├── index.css
      ├── components/
      ├── hooks/
      ├── lib/
      ├── pages/
```
## Env files 

- Backend 
```
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
NODE_ENV=production
```

- Frontend 
```
VITE_BACKEND_URL=https://your-backend-domain.com
```

## Getting Started

### Backend

1. Navigate to the `Backend` directory:
    ```sh
    cd Backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Set up your environment variables in `.env`.
4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the `Frontend` directory:
    ```sh
    cd Frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm run dev
    ```

## Deployment

- The project includes configuration for deployment on platforms like Vercel (frontend) and Render (backend).

## Contributing

Contributions are welcome! Please open issues or submit pull requests.


---

**Made with ❤️ by [Himanshu Rai](https://github.com/HIMANSHURAI2004) and [Kshitij Singh](https://github.com/Kshitij269)**
