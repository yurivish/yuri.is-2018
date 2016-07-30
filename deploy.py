# coding=utf-8

import os, shutil
from subprocess import call, check_output
from build_assets import relpath
import build_assets

def main():
	if os.path.exists('dist'):
		shutil.rmtree(relpath('dist'))

	# Build assets
	build_assets.main()

	# Build the static site
	# call(['hugo'], cwd=relpath())

	call(['git', 'checkout', '--orphan', 'gh-pages'])
	call(['git', 'reset'])
	call(['git', 'commit', '--allow-empty', '-m', 'Initial commit'])
	call(['git', 'checkout', '--force', 'master'])
	call(['git', 'worktree', 'add', 'dist', 'gh-pages'])
	call(['hugo'])
	call(['cp', '-a', 'public/.', 'dist'])

	call(['git', 'add', '--all'], cwd=relpath('dist'))
	call(['git', 'commit', '-m', 'Deploy.'], cwd=relpath('dist'))
	call(['git', 'push'], cwd=relpath('dist'))

	shutil.rmtree(relpath('dist'))
	# rm dist

	
	# clean = len(check_output(['git', 'status', '--porcelain'], cwd=relpath())) == 0
	# if not clean:
	# 	print("This repository contains uncommitted changes. Commit them in order to deploy.")
	# 	return

	# if not os.path.exists('public/.git'):
	# 	if os.path.exists('public'): shutil.rmtree(relpath('public'))
	# 	call(['git', 'branch', '-d', 'gh-pages'])
	# 	call(['git', 'worktree', 'add', '-b', 'gh-pages', 'public', 'origin/gh-pages'], cwd=relpath())

	# # Build assets
	# build_assets.main()

	# public = relpath('public')

	# # Commit and push gh-pages
	# call(['git', 'add', '.'], cwd=public)
	# call(['git', 'commit', '-m', 'Update website.'], cwd=public)
	# call(['git', 'push'], cwd=public)

if __name__ == '__main__':
	main()
