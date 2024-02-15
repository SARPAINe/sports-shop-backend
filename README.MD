# Running Application Server Locally with Docker

## Prerequisites

-   [Docker](https://www.docker.com/get-started) installed on your machine.

## Steps

1.  **Clone the repository and navigate to the project directory**

    ```bash
    git clone <repository_url> && cd <repository_directory>
    ```

2.  **Create a .env File**

    Create a .env file in the root of your project. You can copy the contents from the provided .env.txt file. Adjust the values based on your application's configuration and requirements.

3.  **Build the Docker Image**

    Build the Docker image by running the following command:

    ```bash
    docker build -t your-image-name .
    ```

4.  **Run the Docker Container:**

    Run the Docker container with the following command:

    ```bash
    docker run -p 3000:3000 --rm --env-file $(pwd)/.env -v $(pwd):/usr/src/app -v /usr/src/app/node_modules your-image-name
    ```

    This command will start the application and expose it on http://localhost:3000. The --env-file flag is used to provide environment variables, and the -v flags mount the local code directory and exclude the node_modules directory.

## Access the Application:

Open your web browser and navigate to http://localhost:3000 to access the running application.

## Additional Notes

The container will automatically reflect any changes made to your code locally.
To stop the application, you can use Ctrl+C in the terminal where Docker is running, or run docker stop container-id in a separate terminal (replace container-id with the actual container ID).
If you make changes
