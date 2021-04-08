FROM python:3.8-alpine

RUN apk update && apk add postgresql-bdr-client postgresql-dev build-base shadow

WORKDIR /usr/src/songbook/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apk del build-base postgresql-dev

RUN useradd songbook

COPY . .

RUN chown -R songbook /usr/src/songbook/backend

USER songbook

ENV PYTHONUNBUFFERED 0

ENV FLASK_ENV production

EXPOSE 5000

CMD ["sh", "start.sh"]
