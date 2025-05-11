# Use a lightweight official Python image
FROM python:3.12-slim

# --- Add this stage ---
# Define the stage for UV so we can copy from it
FROM ghcr.io/astral-sh/uv:0.5.4 as uv-installer

# Back to main image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    openssh-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy uv binary from previous stage
COPY --from=uv-installer /uv /usr/local/bin/uv

COPY backend/pyproject.toml backend/uv.lock backend/.python-version ./
RUN uv sync --frozen --no-cache

# Copy rest of your code
COPY . .