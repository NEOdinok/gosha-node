**Docker node**

docker-compose down --volumes --remove-orphans
docker-compose build --no-cache
docker-compose up

**Connect to mongo in a running container:**
docker exec -it mongo mongosh -u admin -p goshaadmin123 --authenticationDatabase admin
use test
db.users.find().pretty()
