#### How to start the server

    * Instance information

Public IP:134.117.132.73

username:student

password:student

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


#### Extensions:

* REACT & Babel

---


#### Design Decisions

* We seperate out server code to routers, controllers, models.. .etc., which modular our project, make it has more Scalability, easy to maintain.
* Using ejs to replace html, which save us a lot of time to messing around the data.
* Using yarn to replace npm, which is faster(in this case).

---


#### Improvement of the system

* First I would say is the design of front-end(layout), since the layout was pretty much manually made with absolute position instead of fixed onto the page. and we should use smarter way to add element onto page.
* Second is the user account, we could add more logical and detailed restriction while user signing up.
* Thirdly is the searching algorithm, it has a large room to improve, liek fuzzy search, and using ajax to display a prediction when you input something in the searchbox.
* And we may retrieve more data online, not only use the provided data.

---


#### Prefered feature(s)

Well, we don't think here is anything specific that we should like most, becuase we like the entire project which is a finlly crafted artware of us. Such as the layout design, we should make it scalable, useful and pretty(like the fonts and the animations). As for the algorithms, such as recommanding movies to users, or returning searching results, all of these should be intelligent efficient and stable.

We carefully follow the project instuction provided, and make efforts on designing algorisms as well as beautifing web pages. All of our progress that working on this project is all about attempting to make the best of it as we wish and planned at beginning. Also, we balieve that a feature that can be called as a  "best feature" should achieve some great innovations which has a technical level above what we had learnt from our course, it much more like a exploration of us in the unknown field. However, what we focus on this project is using the knowldege that we had learnt so far to make the best and closest one to the ideal project of us, becuase we believe that a stable program is better than a fancy program.



---


#### Author

Student1: Yuchen, Liu  101032193 COMP2406B

Student2: Zhiyuan, Lu  101111233 COMP2406A

