# Backend Dockerfile for Python FastAPI
FROM python:3.11-slim

WORKDIR /app

# Sistem asılılıqları
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python asılılıqları
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Mənbə kodlarını kopyala
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
