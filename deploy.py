# coding=utf-8

import os, shutil
from subprocess import call, check_output
from build_assets import relpath
import build_assets

def main():
	clean = len(check_output(['git', 'status', '--porcelain'], cwd=relpath())) == 0
	if not clean:
		print("This repository contains uncommitted changes. Commit them in order to deploy.")
		return

	if not (os.path.exists('public') and os.path.exists('public/.git')):
		shutil.rmtree(relpath('public'))
		call(['git', 'worktree', 'add', '-b', 'gh-pages', 'public', 'origin/gh-pages'], cwd=relpath())

	# Build assets
	built_asssets.main()

	public = relpath('public')

	# Build the static site
	call(['hugo'], cwd=relpath())

	# Commit and push gh-pages
	call(['git', 'add', '.'], cwd=public)
	call(['git', 'commit', '-m', 'Update website.'], cwd=public)
	call(['git', 'push'], cwd=public)

if __name__ == '__main__':
	main()
