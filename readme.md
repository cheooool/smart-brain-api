# Smart-Brain-API-Docker

image url을 입력 했을 때 사진내에서 얼굴을 찾아주는 API 서비스

## 사용 기술

- express / nodejs
- knex / postgresql
- docker
- [clarifai](https://www.clarifai.com/)

## 실행

1. clone repo
2. `npm install` 실행
3. 최상위 폴더에 .env 파일 생성 후 `CLARIFAI_API_KEY=Clarifai API KEY` [API key 생성](https://www.clarifai.com/)
4. docker 설치
5. `docker-compose up --build` 실행
