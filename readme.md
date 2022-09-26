# Dockerized Booking car service

This is a personal project to practice docker with nodejs and mysql.

# Setup

## Requirements

Make sure you have installed docker and docker-compose.

## Run

```bash
$ git clone
$ cd booking-car-service
$ docker build -t booking-car-service .
$ docker-compose up -d
```

# Usage

Before using the service, you will need to create a `.env` file with the following variables:

```
PORT = 8080

DB_HOST = express_car_db
DB_USER = root
DB_PASSWORD = secret
DB_NAME = carsexpress
DB_PORT = 3306
```

# Endpoints

## GET /cars

-   Response 200 (json)

    -   Body

        ```json
        [
        	{
        		"id": 1,
        		"brand": "Audi",
        		"model": "A3",
        		"year": 2019,
        		"color": "red",
        		"price": 1000
        	},
        	{
        		"id": 2,
        		"brand": "Audi",
        		"model": "A4",
        		"year": 2019,
        		"color": "red",
        		"price": 1000
        	}
        ]
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

    s

## GET /cars/:id

-   Response 200 (json)

    -   Body

        ```js
            {
                "id": 1,
                "brand": "Audi",
                "model": "A3",
                "year": 2019,
                "color": "red",
                "price": 1000,
            }
        ```

-   Response 404 (json)

    -   Body

        ```json
        {
        	"error": "Car not found"
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

-   Response 400 (json)

    -   Body

        ```json
            {
                "error": "No id provided" ||
                "error": "Invalid id" ||
                "error": "Invalid id type" ||
            }
        ```

## POST /car

-   Request (json)

    -   Body

        ```json
        {
        	"brand": "Audi",
        	"model": "A3",
        	"year": 2019,
        	"color": "red",
        	"price": 1000
        }
        ```

-   Response 201 (json)

    -   Body

        ```json
        {
        	"message": "Car created successfully"
        }
        ```

-   Response 400 (json)

    -   Body

        ```json
        {
        	"error": "Must provide all fields"
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## PATCH /cars/:id

-   Request (json)

    -   Body

        ```json
        {
        	"brand": "Audi",
        	"model": "A3",
        	"year": 2019,
        	"color": "red",
        	"price": 1000
        }
        ```

-   Response 200 (json)

    -   Body

        ```json
        {
        	"message": "Car updated"
        }
        ```

-   Response 400 (json)

    -   Body

        ```json
        {
        	"error": "No update fields provided"
        }
        ```

-   Response 404 (json)

    -   Body

        ```json
        {
        	"error": "Car not found"
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## DELETE /cars/:id

-   Response 200 (json)

    -   Body

        ```json
        {
        	"message": "Car deleted"
        }
        ```

-   Response 404 (json)

    -   Body

        ```json
        {
        	"error": "Car not found"
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```
