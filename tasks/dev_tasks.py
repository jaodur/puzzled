from invoke import run, task


@task(name='prettier')
def prettier(context):
    """Runs prettier, a JS code formatter"""
    run('bin/prettier_fix.sh', echo=True)


@task(name='set-node-path')
def set_node_path(context):
    """set node path"""
    run('bin/functions/set_node_path.sh', echo=True)


