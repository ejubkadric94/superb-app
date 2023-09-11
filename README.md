# Description
This app allows a manager to add tables to a restaurant. Later, a manager can also add bookings to each table - and delete bookings.
Restaurant working hours are by default set to 08-23 so no bookings can be made outside of that time frame. Also, there can not be two bookings for one table in the same time.

The application itself is built using these technologies:
- MongoDB database 
- Node & KoaJS backend (with Mongoose to handle database CRUD operations)
- React + React query frontend

Other than that, I chose Antd library to create frontend components (such as Modal, DatePicker, etc.) without having to implement these on my own. Therefore the mentioned components and the whole app is accessible with keyboard and complies with `WACG standards`.

`React Query` is used on the frontend side to handle API requests along with plain javascript `fetch`. 

The whole solution is dockerized, so there are 3 docker services: backend, frontend and mongo.
Internaly they are running on pretty much default ports:
- backend: `localhost:3000`
- frontend: `localhost:3001`
- mongo: `localhost:27017`

__Note__: Both frontend and backend are written in Typescript.

# Instructions on running
1. Build docker image: `sudo docker-compose build`
1. Run docker image: `sudo docker-compose up`
1. Enter the backend directort: `cd backend`
1. Populate database with the test restaurant: `npm run seed` (**Don't forget this step**)
1. The app runs on `http://localhost:3001`

# Instruction on testing
1. Navigate to the backend folder: `cd pathToApp/backend/`
1. Run the test command: `npm run test`

Note: In case you experience tests failure due to missing library: "libcrypto.so.1.1", please install the missing dependencies [Link to this issue comment on GitHub](https://github.com/nodejs/docker-node/issues/1915#issuecomment-1589387922)

# Drawbacks
Due to the limited time for implementation of this pet project, I decided not to implement these features:
- **Admin login and multiple restaurant**: Currently there is only one restaurant that is predefined and seeded into the database. And the user is automatically an admin who can add tables and bookings.
Login could be implemented using "Login with google" etc.
- **Customer's view**: This view could allow students to login and create bookings for themselves.