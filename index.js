const AWS = require('aws-sdk');
const Discord = require('discord.js');

const client = new Discord.Client();

AWS.config.update({region:process.argv[4]});
const sqs = new AWS.SQS();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	sqs.sendMessage({
		MessageBody: JSON.stringify(msg),
		QueueUrl: process.argv[3],
	}).promise()
});

client.login(process.argv[2]);
