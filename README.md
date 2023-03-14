## EC2 Server Control Bot for Discord
Basically, this is a bot to turn on/off EC2 instances and check their statuses. Very much WIP. This bot is coded for a single bot to be controlled per Discord server, but I'm sure you could figure out how to change that.

## Setup
1. Create a bot on the Discord developer dashboard.
2. clone this
3. npm install
4. create `.env` file as follows:

## .env file
* `AWS_ACCESS_KEY_ID`: the access key for the IAM role which will control the servers. [Have a look here:](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)
* `AWS_REGION`: your instance('s) region(s)
* `AWS_SECRET_ACCESS_KEY`: The SECRET access key for your IAM role (see above link
* `CLIENT_ID`: The client ID of your API app
* `GUILD_IDS`: a comma separated list of Discord Server Guild IDs that correspond to the instance IDs that follow...
* `INSTANCE_IDS`: ...here! There needs to be a 1 to 1 relationship between guild IDs and instance IDs, or else this bot will flop.
* `TOKEN`: your Discord bot client token. Terribly named.

To start, run the bot with `npm start` and presto: the bot should show up!

Run `/start-server` to start up the instance.
Run `/check-server` to check whether or not an instance is online. Note that instances take a while to appear `OFFLINE` after being shut down.

Enjoy!
