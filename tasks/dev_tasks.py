from invoke import run, task


@task(name='prettier-pj')
def prettier_js(context):
    """Runs prettier, a JS code formatter"""
    run('bin/prettier_fix.sh', echo=True)

@task(name='prettier-py')
def prettier_py(context):
    run('autopep8 --in-place --recursive .', echo=True)


@task(name='set-node-path')
def set_node_path(context):
    """set node path"""
    run('bin/functions/set_node_path.sh', echo=True)


@task(name='install-requirements')
def install_requirements(context):
    """Install python and node requirements"""
    run('pipenv install --skip-lock', echo=True)
    run('npm install', echo=True)
