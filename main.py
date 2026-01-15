from fastapi import FastAPI
import database_model
from model import Product, Data
from database_model import Product as ProductsTable
from database import engine,SessionLocal
app = FastAPI()

database_model.Base.metadata.create_all(bind=engine)

db = SessionLocal()

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