FROM python:3

WORKDIR /usr/src/songbookit/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd songbookit
RUN chown -R songbookit /usr/src/songbookit/backend

USER songbookit

ENV POSTGRES_USER songbookit
ENV POSTGRES_PASSWORD password
ENV POSTGRES_HOST db
ENV POSTGRES_PORT 5432
ENV PYTHONUNBUFFERED 0

EXPOSE 5000

CMD ["sh", "start.sh"]