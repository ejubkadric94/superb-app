# Instructions on running
1. Build docker image: `sudo docker-compose build`
1. Run docker image: `sudo docker-compose up`
1. Populate database with the test restaurant: `npm run seed`

# Instruction on testing
```
cd pathToApp/backend/
npm run test
```
Note: In case you experience tests failure due to missing library: "libcrypto.so.1.1", please install the missing dependencies [Link to this issue comment on GitHub](https://github.com/nodejs/docker-node/issues/1915#issuecomment-1589387922)


# Description and the process
This app shows the