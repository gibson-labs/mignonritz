# ---------- Python runtime ----------
FROM python:3.12-slim AS runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production \
    FLASK_APP=run.py \
    PORT=5000

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./

COPY frontend/ /app/static/

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "run:app"]
