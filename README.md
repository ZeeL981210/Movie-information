#### How to start the server

    * Instance information

Public IP:__________

username:______

password:________

    * Start supporting software and database
        * first run the mongodb database
```plain
sudo systemctl start mongod
```
        * varify if it is running
```plain
sudo systemctl status mongod
```
    * Initialization steps

There are two json file which include initial data, if you want to initialize database

```plain
mongoimport -d movies -c movies --file user.json --type json
mongoimport -d movies -c movies --file movies.json --type json
```
    * How to run the server
        * First go to directory /Desktop/project/
        * Secondly, run command
```plain
$ yarn start
```
    * modules are installed already.

---
#### 

#### Summary of functions

* User
    * Sign-up and log-in/out as regular/contributor user
    * View their profile(history,recommendation,follower and subscribers)
    * Contribute a movie(contributor only)
    * make a review(have to rate at the same time)
    * Follow/Unfollow a person
    * You can have your own Avatar(by cliking on the img)
* Movie
    * Search movie
    * view movie information
    * See director's related work
    * a chart on main page show the top-5 ranked movies.

---










