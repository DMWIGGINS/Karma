# Karma Koins

[Watch A Demo!](https://www.screencast.com/t/OtD4uzcT)

## We all need help sometimes. Karma Koins makes it easy!

Suppose you needed a hand with something. Maybe you have a closet that needs to be sorted through and you can't get motivated to do it. Perhaps you need a friend to watch your kid for an hour so you can run some errands. Going away on vacation?...Who is going to feed your cat? Karma to the rescue! Karma is an app where a group of friends can ask for and give help. Each group member will be assigned Karma Koins when they join. They will have the option to ask for assistance by entering the task they need help with, the date, and how many Karma Koins it "pays". Following in the true inspiration of Karma, the biggest appeal of the app is the ability to give back. Users will be able to see the list of tasks that friends need done and can select which ones they will help with. You can only ask for help if you have Karma Koins, so the spirit is really about doing more than you take :)

# Starting/Stopping the app
In the package.json file, you'll see a list of dependencies. Once you’ve cloned the Karma repo down, run ‘npm install’ to install the npm packages needed to run Karma Koinds. Once you’ve installed your dependencies, run ‘node server.js’ to start the app.

# Routes
- /landing
- /api/user/create
- /profile
- /favors
- /api/favor/new
- /favorsdetail/:id
- /api/favorsdetail/
- /about
- /api/user/logout

# SQL Schema
## You don’t need to build the tables! Just open ‘karma_db.sql’ and create the db. The following tables will be created automatically using sequelize:

favor
------
- favor_name: string
- favor_desc: string
- favor_datetime: string
- favor_asker_id: integer
- favor_completer_id: integer
- favor_asker_name: integer
- favor_completer_name: string
- favor_status: string
- favor_price: integer

users
------
- user_name: string
- user_email: string
- profile_pic_link: string
- user_karma_koins: integer
- fb_user_id: string

group
------
- group_name: string
- group_leader: string
  
# Database Setup
Ensure that your ‘config.json’ file has the correct root password listed.

# Tech Stack Diagram
![functionaldiag](https://github.com/DMWIGGINS/Karma/blob/master/app/public/assets/images/karma_tech_stack.png)