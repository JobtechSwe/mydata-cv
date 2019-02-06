# mydata-cv
A Data Source/Data Sink offering a searchable CV

# Configuration
Create a file named `.env` in the project directory containing URLs needed for the services to find each other, example for a developers machine:
```
NODE_ENV=development
CLIENT_ID=http://192.168.1.42:4000
OPERATOR_URL=http://192.168.1.42:3000
APM_SERVER=http://localhost:8200
```
- `NODE_ENV` is either `development`, `test` or `production`
- `CLIENT_ID` is the URL where the phone app can reach this service (with protocol, http/https).
- `OPERATOR_URL` is the URL (with protocol, http/https) where this service can reach the operator
- `APM_SERVER` is the URL where this service can reach APM (for logging requests and errors)

Good luck.
