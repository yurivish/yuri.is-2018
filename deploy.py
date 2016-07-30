# coding=utf-8

import os
from subprocess import call, check_output

def relpath(path):
	'''Return a version of `path` relative to the directory of this script.'''
	here = os.path.dirname(os.path.realpath(__file__))
	return os.path.join(here, path)

def main():

	assert(len(check_output(['git', 'status', '--porcelain'], cwd=relpath(''))) == 0)

	public = relpath('public')
	call(['hugo'], cwd=relpath(''))
	call(['git', 'add', '.'], cwd=public)
	call(['git', 'commit', '-m', 'Update website.'], cwd=public)
	call(['git', 'push'], cwd=public)

if __name__ == '__main__':
	print(relpath(''))
	main()
