FROM python:3

WORKDIR /usr/src/songbookit/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd songbookit
RUN chown -R songbookit /usr/src/songbookit/backend

USER songbookit

ENV PYTHONUNBUFFERED 0
ENV PROD true

EXPOSE 5000

CMD ["sh", "start.sh"]