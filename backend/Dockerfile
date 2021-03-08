FROM python:3

WORKDIR /usr/src/songbook/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd songbook
RUN chown -R songbook /usr/src/songbook/backend

USER songbook

ENV PYTHONUNBUFFERED 0

EXPOSE 5000

CMD ["sh", "start.sh"]