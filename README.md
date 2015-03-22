
## install

0. Set up a heroku server "my_mtg_pairings"
1. `git remote add heroku git-location-of-server`
2. `heroku buildpack:set https://github.com/heroku/heroku-buildpack-multi.git -a my_mtg_pairings`
3. `git push heroku master`


