var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var queueURL = "";

var params = {
 DelaySeconds: 10,
 MessageAttributes: {
  "Title": {
    DataType: "String",
    StringValue: "lol"
   },
  "Author": {
    DataType: "String",
    StringValue: "hiii"
   },
  "WeeksOn": {
    DataType: "Number",
    StringValue: "6"
   }
 },
 MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
 QueueUrl: `${queueURL}`
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
