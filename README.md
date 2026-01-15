## Todo-FastAPI

Simple FastAPI CRUD service for managing products stored in PostgreSQL using SQLAlchemy ORM.

### Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- Uvicorn (dev server)

### Prerequisites

- Python 3.11+
- PostgreSQL running locally
- Create a database (e.g., `products`) and user with permissions.
- Update the connection string in `database.py` if it differs from your local setup.

### Setup

1. Install dependencies

```bash
python -m venv .venv && source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary
```

2. Start the API

```bash
uvicorn main:app --reload
```

### Endpoints

- `GET /` – health check (“Hello world”).
- `GET /allProducts` – list all products.
- `POST /addProduct` – create a product.
  ```json
  {
    "name": "Laptop",
    "desc": "Ultrabook",
    "price": 1200
  }
  ```
- `POST /product/{id}` – fetch one product by id.
- `PUT /update/{id}` – update an existing product (same body as create).
- `DELETE /delete/{id}` – delete a product by id.

### Notes

- Database tables auto-create at startup via `Base.metadata.create_all`.
- `id` is auto-incremented by the database; you only send `name`, `desc`, and `price` in requests.

### Troubleshooting

- If data is not saving, verify PostgreSQL is reachable and credentials in `database.py` are correct.
- Ensure you call `db.commit()` after `db.add(...)` (already done in routes).
- If you change the schema, drop/recreate the table or generate migrations.
