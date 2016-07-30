# coding=utf-8

import os
from subprocess import call, check_output
from build_assets import relpath
import build_assets

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
