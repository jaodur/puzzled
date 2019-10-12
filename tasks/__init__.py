from invoke import Collection

from .testing_tasks import lint_js, lint_py, test_python
from .dev_tasks import prettier, set_node_path, install_requirements

task_col = Collection()

task_col.add_task(prettier)
task_col.add_task(lint_js)
task_col.add_task(lint_py)
task_col.add_task(test_python)
task_col.add_task(set_node_path)
task_col.add_task(install_requirements)
