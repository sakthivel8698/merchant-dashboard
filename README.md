Setup : 

1.) This project is built using React (Vite).
2.) After cloning the repository, install dependencies using npm install, then start the development server with npm run dev. The application will be available at http://localhost:5173.
3.) All order data is managed through Redux and persisted using LocalStorage.

Assumptions :

1.) Orders are uniquely identified using an orderId.
2.) Offline orders are marked using isSynced = false.
3.) Sync happens automatically when internet connectivity is restored.

Trade-offs :

1.) LocalStorage is used instead of a REST API.
2.) No third-party form management libraries (e.g., Formik).