'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;

/*
* Get contact by name
* path: contacts/get/{name}
*/
module.exports.get = (event, context, callback) => {

  const params = {
    TableName,
    Key: {
      name: event.pathParameters.name,
    },
  };

  dynamoDb.get(params, (error, result) => {

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
      data: result.Item
    };
    const response = {
      statusCode: 200,
      body: JSON.stringify(body),
    };
    callback(null, response);
  });
};
