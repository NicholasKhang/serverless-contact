'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;

/*
* Create contacts
* path: contacts/create
*/
module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);

  // Validate name
  if (!data.name) {
    const errorMessage = 'name cannot be empty';
    console.error(errorMessage);
    const body = {
      error: {
        statusCode: 400,
        message: errorMessage
      }
    };
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(body),
    });
    return;
  }

  const params = {
    TableName,
    Item: {
      name: data.name,
      phone: data.phone,
      email: data.email
    },
  };

  dynamoDb.put(params, (error) => {
    // Error handler
    if (error) {
      console.error(error);
      const body = {
        error: {
          statusCode: error.statusCode,
          message: error.message
        }
      };
      callback(null, {
        statusCode: error.statusCode || 501,
        body: JSON.stringify(body),
      });
      return;
    }

    // Response
    const body = {
      statusCode: 200,
      data: params.Item,
      message: data.name + " created successfully"
    };
    const response = {
      statusCode: 200,
      body: JSON.stringify(body)
    };
    callback(null, response);
  });
};
