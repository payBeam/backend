# cd src && npx prisma generate && cd ..
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build
