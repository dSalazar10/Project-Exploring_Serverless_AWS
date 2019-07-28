# Example Serverless App

This creates a serverless app that includes one endpoint and one 
DynamoDB resource with the appropriate IAM permissions to scan,
get and put items.


To create a boilerplate Serverless Project use the following:
* `sls create --template aws-nodejs-typescript`

To deploy the app use the following:
* `sls deploy -v`

to remove the app use the following:
* `sls remove`


To get this to work you need to go into aws console and add the auth0
secret key to the secrets manager that is created after deployment.

If you are going to use the Postman collection, be sure to update
the host to the ServiceEndpoint.

You might also want to change the region if you are not going to
use us-east-2. That can be specified in the serverless cli as an
argument, or just manually change it in the serverless.yml file.
