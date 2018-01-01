# SchoolReviewHub (SRH)
SRH is team Code Sauce's entry for the SauceCode Hackathon. It's a comparison-based review system that allows users review schools and their management. Visit app: https://schoolreviewhub.herokuapp.com.

## Built with
- Bulma CSS
- React
- Django
- MySQL

## Requirements
- Python 3
- Node.js and NPM
- MySQL server

## Setup
- Create a virtual environment.
- Install the packages in *requirements.txt* by running `pip install -r requirements.txt`.
- Create a *.env* file from *.env.example*.
- Create a MySQL DB and start the DB server.
- Run migrations using `python manage.py migrate`.
- Run API using `python manage.py runserver`.
- Install SPA dependencies with `npm install` in `app/school-review-hub`. 
- Run SPA with `npm start`.
- Build SPA using `npm run build`.

**PS: Please, do not track/commit build or local config files. Also, try as much as possible to use [semantic commit messages](https://seesparkbox.com/foundry/semantic_commit_messages).**