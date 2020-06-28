# Serverless + Nodejs + DynamoDB API

## Prerequisites

-   AWS account (Lambda & DynamoDB)
-   Nodejs

## Installation

Clone or download this repository.

### Install Serverless with NPM

```
$ npm install serverless -g
```

### Deploy to AWS Lambda

```
$ serverless deploy
```

You will get the endpoint once deployed successfully.

## API Documentation

**Data format:** JSON

**Function**

-   [Create](#create)
-   [List](#list)
-   [Get]($get)

---

### Create

Create contact.

**HTTP Method:** POST

**Path:** /contacts/create

**Url:**

> https://{endpoint}/{stage}/contacts/create

**Example**

> https://example.execute-api.ap-southeast-1.amazonaws.com/dev/contacts/create

#### Request Body

| Name  | Type   | Description                         |
| ----- | ------ | ----------------------------------- |
| name  | string | **_required_** Contact name         |
| phone | string | **_optional_** Contact phone number |
| email | string | **_optional_** Contact email        |

**Example**

```json
{
	"name": "John",
	"phone": "787-999-9898",
	"email": "john@abc.com"
}
```

#### Response

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| statusCode | number | Response status code |
| data       | object | Contact information  |
| message    | string | Response message     |

**Sample success response**

```json
{
	"statusCode": 200,
	"data": {
		"name": "John",
		"phone": "787-999-9898",
		"email": "john@abc.com"
	},
	"message": "John created successfully"
}
```

**Sample error response**

```json
{
	"error": {
		"statusCode": 400,
		"message": "name cannot be empty"
	}
}
```

---

### List

List all contacts.

**HTTP Method:** GET

**Path:** /contacts/get

**Url:**

> https://{endpoint}/{stage}/contacts/get

**Example**

> https://example.execute-api.ap-southeast-1.amazonaws.com/dev/contacts/get

#### Response

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| statusCode | number | Response status code |
| data       | object | Contacts information |

**Sample success response**

```json
{
	"statusCode": 200,
	"data": {
		"contacts": [
			{
				"name": "John",
				"phone": "787-999-9898",
				"email": "john@abc.com"
			},
			{
				"name": "Ben",
				"phone": "+605592668332",
				"email": "ben_mark@gmail.com"
			}
		]
	}
}
```

---

### Get

Search contact by name.

**HTTP Method:** GET

**Path:** /contacts/get/{name}

**Url:**

> https://{endpoint}/{stage}/contacts/get/{name}

**Example**

> https://example.execute-api.ap-southeast-1.amazonaws.com/dev/contacts/get/John

#### Response

| Name       | Type   | Description          |
| ---------- | ------ | -------------------- |
| statusCode | number | Response status code |
| data       | object | Contact information  |

**Sample success response**

```json
{
	"statusCode": 200,
	"data": {
		"name": "John",
		"phone": "787-999-9898",
		"email": "john@abc.com"
	}
}
```
