from invoke import run, task

@task(name='prettier')
def prettier(context):
    """Runs prettier, a JS code formatter"""
    run('bin/prettier_fix.sh', echo=True)
