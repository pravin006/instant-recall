InstantRecall is a web application designed to enhance learning and memory retention using active recall techniques. This app allows you to create, manage, and review decks of flashcards. 

#### Home Page
![Home Page](/screenshots/home.png)
#### Deck Page
![Deck Page](/screenshots/deck.png)
#### Create Card Page
![Create Card Page](/screenshots/create.png)
#### View Card Page
![View Card Page](/screenshots/edit_delete.png)
#### Review Page
![Review Page](/screenshots/review.png)

## Stack
Frontend: React.js, React Bootstrap, Apollo Client  
Backend: Node.js, Express.js, GraphQL, Mongoose  
Database: MongoDB, Redis  

## Installation Using Docker
### Prerequisites
Docker  

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pravin006/instant-recall.git
   cd instant-recall

2. **Build and Run**
   ```bash
   docker-compose up -d

## Installation Using npm
### Prerequisites
Node.js  
npm  
MongoDB  
Redis  

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pravin006/instant-recall.git
   cd instant-recall

2. **Install dependencies**
   ```bash
   npm install
   npm run install-all

3. **Set up .env file in the server folder**
   ```bash
   MONGO_URI = mongodb_connection_string
   NODE_ENV = 'development' <!-- To access GraphiQL -->

4. **Start Redis Server**
   ```bash
   redis-server <!-- If installed on local machine -->
   or
   sudo service redis-server start <!--  If installed as a service -->
   
5. **Start the development environment**
   ```bash
   npm run dev

## License
This project is licensed under the MIT License. See the LICENSE file for details.

Hope you enjoy using InstantRecall!! Happy studying! 📚💡