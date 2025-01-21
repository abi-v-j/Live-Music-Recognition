# Live Music Recognition App

Demo: [Live Music Recognition](https://live-music-recognition.vercel.app/)

## Overview
The **Live Music Recognition App** is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It integrates two powerful APIs:

- **Spotify API**: To fetch similar songs and detailed music metadata.
- **ACRCloud API**: To recognize music playing in the environment.

This app allows users to identify music playing nearby and discover similar tracks using Spotify.

## Features
- **Music Recognition**: Recognize songs in real time using ACRCloud.
- **Similar Tracks**: Fetch similar tracks and metadata from Spotify.
- **User-Friendly Interface**: Intuitive design for seamless user experience.
- **Cross-Platform Support**: Accessible on both desktop and mobile devices.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **CSS/Styled Components**: For styling.

### Backend
- **Node.js & Express.js**: For creating the API endpoints.
- **MongoDB**: For storing user preferences or app data.

### APIs
- **Spotify API**: To fetch details and suggestions for similar music.
- **ACRCloud API**: For identifying songs playing in real time.

### Deployment
- **Frontend**: Vercel
- **Backend**: Hosted on a cloud server

## Setup Instructions

### Prerequisites
- **Node.js** (v14+)
- **MongoDB**
- Spotify Developer Account
- ACRCloud Account

### Steps to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/live-music-recognition.git
   cd live-music-recognition
   ```

2. **Install dependencies**:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `server` directory with the following keys:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ACR_CLOUD_ACCESS_KEY=your_acrcloud_access_key
   ACR_CLOUD_SECRET_KEY=your_acrcloud_secret_key
   MONGO_URI=your_mongo_database_uri
   ```

4. **Run the backend server**:
   ```bash
   cd server
   npm start
   ```

5. **Run the frontend**:
   ```bash
   cd client
   npm start
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Deployment

1. **Frontend**:
   - Deployed on Vercel: Ensure the build folder from the React app is uploaded.

2. **Backend**:
   - Deploy using cloud services like Heroku, AWS, or any other preferred hosting.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

---

Enjoy recognizing music effortlessly and exploring similar tracks!
