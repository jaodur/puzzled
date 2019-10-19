#### Summary of Changes (What does this PR do?)

#### Is this change ready to hit production in its current state?

Status of maturity (all need to be checked before merging):

- [ ] I consider this code done
- [ ] I've tested this locally
- [ ] Reviewer considers this work safe according to our [Secure Coding Guidelines](https://wiki.gitprime-ops.com/xwiki/bin/view/Security/Secure%20Coding%20Guidelines/?srid=lo8onEPx)
- [ ] This branch has been LGTM'ed by a reviewer

Good to have (up to reviewer's discretion):
- [ ] I've tested this on staging
- [ ] Unit test coverage of changes

#### How should this be manually tested?
* Pull and checkout to this [branch]() locally
* Start  the virtual environment `pipenv shell`
* install python requirements `pipenv install`
* install node requirements `npm install`
* migrate the database `python manage.py migrate`
* run builds `npm run build`
* start the django server `python manage.py runserver`

#### What are the relevant tickets?


#### Screenshots (optional)