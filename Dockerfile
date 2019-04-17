# 노드 설치
FROM node:8.11.1

# 워킹 디렉토리
WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]