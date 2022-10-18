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

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

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

-   Response 201

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

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

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

-   Response 200

-   Response 400 (json)

    -   Body

        ```json
        {
        	"error": "No update fields provided"
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

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

-   Response 200

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## GET /users

-   Response 200 (json)

    -   Body

        ```json
        [
        	{
        		"id": 1,
        		"name": "John Doe",
        		"email": "john.doe@email.com"
        	},
        	{
        		"id": 2,
        		"name": "Jane Doe",
        		"email": "jane.doe@email.com"
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

## GET /users/:id

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

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

## POST /user

-   Request (json)

    -   Body

        ```json
        {
        	"name": "John Doe",
        	"email": "john.doe@email.com",
        	"password": "userpassword"
        }
        ```

-   Response 201

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

## PATCH /users/:id

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

-   Request (json)

    -   Body

        ```json
        {
        	"name": "John Doe",
        	"email": "john.doe@email.com",
        	"password": "userpassword"
        }
        ```

-   Response 200

-   Response 400 (json)

    -   Body

        ```json
        {
        	"error": "No update fields provided"
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## DELETE /users/:id

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

-   Response 200

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## GET /reservations

-   Response 200 (json)

    -   Body

        ```json
        [
        	{
        		"id": 1,
        		"name": "John Doe",
        		"email": "john.doe@email.com"
        	},
        	{
        		"id": 2,
        		"name": "Jane Doe",
        		"email": "jane.doe@email.com"
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

## GET /reservations/:id

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

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

## POST /reservation

-   Request (json)

    -   Body

        ```json
        {
        	"startDate": "2020-01-01",
        	"endDate": "2020-01-02",
        	"carId": 1,
        	"userId": 1
        }
        ```

-   Response 201

-   Response 400 (json)

    -   Body

        ```json
        {
        	"error": "Must provide all fields", ||
            "error": "Dates must be after today", ||
            "error": "Start date must be before end date", ||
            "error": "Car is not available for these dates", ||
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## PATCH /reservations/:id

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

-   Request (json)

    -   Body

        ```json
        {
        	"startDate": "2020-01-01",
        	"endDate": "2020-01-02",
        	"carId": 1,
        	"userId": 1
        }
        ```

-   Response 200

-   Response 400 (json)

    -   Body

        ```json
        {
        	"error": "No update fields provided", ||
            "error": "Dates must be after today", ||
            "error": "Start date must be before end date", ||
            "error": "Car is not available for these dates", ||
        }
        ```

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```

## DELETE /reservations/:id

-   Params (json)

    ```json
    {
    	"id": 1
    }
    ```

-   Response 200

-   Response 500 (json)

    -   Body

        ```json
        {
        	"error": "Internal Server Error"
        }
        ```
