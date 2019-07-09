docker login rg.fr-par.scw.cloud/neekhaulas -u nologin -p 5cc5081a-1e7d-40ac-b0ee-ad81467bb2ca
docker build -t rg.fr-par.scw.cloud/neekhaulas/networkapi:latest .
docker push rg.fr-par.scw.cloud/neekhaulas/networkapi:latest