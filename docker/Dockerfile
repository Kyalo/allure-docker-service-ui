######
FROM node:12.22.12-bullseye-slim AS builder
ENV ROOT=/code
WORKDIR $ROOT
COPY ui $ROOT
RUN npm install && \
    npm run build

######
FROM node:12.22.12-bullseye-slim
ARG BUILD_DATE
ARG VERSION
ARG VCS_REF
LABEL org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.docker.dockerfile="docker/Dockerfile" \
    org.label-schema.license="MIT" \
    org.label-schema.name="Test Automation Reports Dashboard" \
    org.label-schema.version=${VERSION} \
    org.label-schema.description="Test Automation Reports Dashboard" \
    org.label-schema.vcs-ref=${VCS_REF} \
    org.label-schema.vcs-type="Git" \
    org.label-schema.vcs-url="" \
    org.label-schema.authors="Frank Escobar <fescobarsystems@gmail.com>, Maurice Kyalo <mrckyalo@gmail.com>"

RUN apt-get update && \
    apt install curl -y

ENV ROOT=/app

WORKDIR $ROOT
COPY --chown=node:node --from=builder /code/build $ROOT/ui
COPY --chown=node:node server $ROOT/ui
COPY --chown=node:node scripts $ROOT
COPY --chown=node:node ui/generate_env_file.sh $ROOT

RUN echo "${VERSION}" > $ROOT/ui/ui_version && \
    echo "ALLURE_DOCKER_SERVICE_UI_VERSION:" $(cat $ROOT/ui/ui_version) && \
    chmod +x $ROOT/*.sh && \
    npm install --prefix $ROOT/ui

RUN chown -R node:node $ROOT

ENV PORT=5252
EXPOSE $PORT

HEALTHCHECK --interval=10s --timeout=60s --retries=3 \
      CMD curl -f http://localhost:$PORT || exit 1

USER node

CMD $ROOT/run.sh
