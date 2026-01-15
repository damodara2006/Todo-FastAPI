from pydantic import BaseModel
class Product(BaseModel):
    # id: int
    name: str
    desc: str
    price: float
    
        
class Data(BaseModel):
    data : str
    
