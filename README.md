# Weather-App-React

This is a Weather App that allows you to check the latest weather information for different cities. The app uses the OpenWeatherMap API to fetch the weather data and presents it in a user-friendly interface. The application is built using React and follows responsive design principles to work seamlessly on both desktop and mobile devices.

## Features

1. Add and view weather information for multiple cities.
2. Detailed weather information for a selected city.
3. Cache mechanism to store data and reduce API calls.
4. Compatible with the latest versions of Chrome, Firefox, and Safari browsers.

## How to Use

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Run the application using `npm start`.
4. Click on a city card to view detailed weather information for that city.
5. To go back to the main screen, click on the back arrow icon in the top-left corner of the detailed weather information page.
6. To remove a city from the list, click on the close icon in the top-right corner of the city card.
7. To build the Docker image, execute the following command in the project's root directory:

`docker build -t react-weather-app .`

## Running the Docker Container

Once the Docker image is built, you can run the Weather-App-React application inside a Docker container using the following command:

`docker run -d -p 3000:3000 react-weather-app`

The application will be accessible at http://localhost:3000 on your local machine.

## Note

If you encounter any issues with Docker, make sure you have Docker installed and running on your system. Also, ensure that you have the necessary permissions to build and run Docker containers.

## Technologies Used

React
HTML
CSS
JavaScript
OpenWeatherMap API
