#Setting up the backend
you need python: https://www.python.org/downloads/
##Do this is it's own terminal
```
cd backend
```
I would set up a venv:
```
python3 -m venv .venv
source .venv/bin/activate
```
install dependencies:
```
pip install -r requirements.txt
./legoapi/manage.py migrate # this will set up a sqlLite db
./legoapi/manage.py runserver 5000
```
please note I used `uuid` as the id field because it clashed with a django default id fields it uses for models.

# Setting up the frontend
 You'll need Node.js: https://nodejs.org/en/download
##Do this in it's own terminal
```
cd frontend/my-app
npm install
npm start
```
#My Versions
```
> python3 --version
Python 3.10.12
> node --version
v19.6.0
```