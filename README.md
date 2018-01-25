# Karma Koins

## We all need help sometimes. Karma Koins makes it easy!

Asking for help is never an easy task. It can leave you feeling embarrassed, stressed and frankly at times like a loser that you needed to raise your hand. And yet, we have entered such a time where giving back and returning favors has never been so in vogue… From business ventures like TOMs to companies matching monthly charity donations as employment perks, we haven’t seen a time where doing good for others has been so trendy.

Karma joins works to bridge those two concepts. We have developed a full stack app where users can both ask and return favors – in exchange for karma koins. Need a friend to help you move? Got stuck in a work meeting late and need someone to take Frodo the dog out for a walk? Post your request to Karma and watch your friends line up to help. Feeling particularly supportive today? Or maybe you’re bored and want something to do other than binge the latest Netflix original Series? Open up Karma and see what your friends need help with.

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