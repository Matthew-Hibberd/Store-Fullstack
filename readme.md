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

to run backend tests:
```
./legoapi/manage.py test shop
```

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
My Backend is pretty complete with all necessary endpoints and behaves as expected. It was pretty Baisc and I implemented all functionality that was required even though I was a little unsure about the HTTP codes. I would have preffered to stick to the standards insted of allways returning HTTP 200 succes codes.


The Frontend was definetly the biggest challenge: I decided to use a React frame work called Chakra UI https://chakra-ui.com/docs/components and made use of Chat GPT a lot here to learn how to write the cart and user contexts. I have written most of the logic and the shop list connects to the backend I did struggle with the state mannagement syntax but I think I have it under control. I had a lot of fun working with Chakra and learning the ways of react-dom. I also had to imlement a CORS thing for the Django API which was a nice extra piece of backend information I can use. Chakra and Chat GPT definetly sped up this process I would have taken probably 10x the time to make my own components so I really like Chakra.

I hope you like my EXTREAMELY basic frontend!
