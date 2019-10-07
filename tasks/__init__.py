from invoke import Collection

from .testing_tasks import lint_js
from .dev_tasks import prettier

task_col = Collection()

task_col.add_task(prettier)
task_col.add_task(lint_js)
