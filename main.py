from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database_model
from model import Product, Data
from database_model import Product as ProductsTable
from database import engine,SessionLocal
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

database_model.Base.metadata.create_all(bind=engine)

db = SessionLocal()
# @app.
# @app.post("/create")
@app.get("/")
def greet():
     return Data(data="Hello world")

products = [
    Product(id=0, name="damo", desc="Node", price=10000),
    Product(id=1, name="damo", desc="Nonw", price=2000)
]

def adddata():
    count = db.query(ProductsTable).count
    # print(ProductsTable)
    if not count == 0:
        for prod in products:
            db.add(ProductsTable(**prod.model_dump()))
            print("done")
    db.commit()
# adddata()        /

@app.get("/allProducts")     
def read_root():
    return db.query(ProductsTable).all()
# Product

@app.post("/product/{id}")
def getProduct(id : int):
    dbprod = db.query(ProductsTable).all()
    for product in dbprod:
        if(product.id == id):
            return product
    return "No product found"

# products.append(Product(id))
@app.post("/addProduct")
def product(prod : Product):
    db.add(ProductsTable(**prod.model_dump()))
    db.commit()
    return read_root()

@app.put("/update/{id}")
def update(id: int, prod: Product):
    dbprod = db.query(ProductsTable).filter(ProductsTable.id == id).first()
    # print(dbprod)
    if not dbprod:
        return {"message": "No product found"}

    dbprod.name = prod.name
    dbprod.price = prod.price
    dbprod.desc = prod.desc


    db.commit()
    # db.refresh(dbprod)

    return prod

@app.delete("/delete/{id}")
def delete(id : int):
    dbdata = db.query(ProductsTable).filter(ProductsTable.id == id).first()
    print(dbdata)
    if not dbdata:
        return "No record found"
    # db.query(ProductsTable).delete(ProductsTable.id == id)
    db.delete(dbdata)
    db.commit()
    
    return read_root()

@app.post("/instagram")
def fetch(token : str):
    import os
    import json
    import requests
    # from dotenv import load_dotenv

    # load_dotenv()
    print(token)

    ACCESS_TOKEN = token

    url = "https://graph.instagram.com/me/media"
    params = {
  "fields": "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,children{media_type,media_url,permalink}",
  "limit": 50,
  "access_token": token
}

    print(params)
    res = requests.get(url, params=params)
    data = res.json()
    return data
    # return data
