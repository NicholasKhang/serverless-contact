'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.DYNAMODB_TABLE;

/*
* List all contacts
* path: contacts/get
*/
module.exports.list = (event, context, callback) => {
  dynamoDb.scan({ TableName }, (error, result) => {

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
        body: JSON.stringify(body)
      });
      return;
    }

    // Response
    const body = {
      statusCode: 200,
      data: {
        contacts: result.Items
      }
    };
    const response = {
      statusCode: 200,
      body: JSON.stringify(body)
    };
    callback(null, response);
  });
};