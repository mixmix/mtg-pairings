

## install

0. Set up a heroku server
0. `git remote add heroku _name_of_server_`
1. `heroku plugins:install https://github.com/ddollar/heroku-build -a _name_of_server_`
1. `heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git -a _name_of_server_`
1. `heroku build . -b ddollar/multi -r  -a _name_of_server_`
2. `git push heroku master`
