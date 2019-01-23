# mydata-cv
A Data Source/Data Sink offering a searchable CV

# Configuration
By default the service uses `localhost` for all paths, to make it work with the other parts of MyData create a file named `.env` in the project directory containing URLs needed for the services to find each other, example for a developers machine:
```
CLIENT_ID=192.168.1.42:4000
OPERATOR_URL=http://192.168.1.42:3000
```
Where CLIENT_ID is the URL where the phone app can reach this service (without protocol). And OPERATOR_URL is the URL (with protocol, http/https) where the operator is reachable from both this service and the phone app.

Good luck.
