# coding=utf-8

import os
from subprocess import call, check_output
from build_assets import relpath
import build_assets

def main():
	clean = len(check_output(['git', 'status', '--porcelain'], cwd=relpath())) == 0
	if not clean:
		print("This repository contains uncommitted changes. Commit them in order to deploy.")
		return

	public = relpath('public')
	call(['hugo'], cwd=relpath())
	call(['git', 'add', '.'], cwd=public)
	call(['git', 'commit', '-m', 'Update website.'], cwd=public)
	call(['git', 'push'], cwd=public)

if __name__ == '__main__':
	main()
