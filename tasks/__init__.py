from invoke import Collection

from .testing_tasks import lint_js

col = Collection()

col.add_task(lint_js)
