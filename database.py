from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


url = "postgresql://postgres:9994Damo@localhost:5432/products"

engine = create_engine(url)

SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)