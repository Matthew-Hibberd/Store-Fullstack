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

# My progress
planning: https://miro.com/app/board/uXjVMhjR_dA=/?share_link_id=320587696840
My Backend is pretty complete with all necessary endpoints and behaves as expected. I didn't get to writing tests yet unfortunately. I was running out of time and needed to start on the front ened which I have never used before

The Frontend was definetly the biggest challenge: I decided to use a React frame work called Chakra UI https://chakra-ui.com/docs/components and made a lot of use of Chat GPT here to learn how to write the cart and user contexts. I have written most of the logic and the shop list connects to the backend but I didn't get the User state working but the register and login connects and works properly in terms of making requests but unfotunatly I couldn't get the state to update with the relevent User information So the Front end is incomplete but you can see some of the create order process if you use the data I specified in the repo for testing and remove the create order request code and make the response 200 ok so that it will kind.
