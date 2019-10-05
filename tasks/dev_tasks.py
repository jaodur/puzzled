from invoke import run, task

@task(name='prettier')
def prettier(context):
    """Runs prettier, a JS code formatter"""
    run('bin/prettier-fix.sh', echo=True)
