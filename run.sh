docker-compose -f docker-compose.dev.yml down
# cd src && npx prisma generate && cd ..
docker-compose -f docker-compose.dev.yml up --build
