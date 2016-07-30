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

	call(['git', 'branch', '-D', 'gh-pages'])
	call(['git', 'checkout', '--orphan', 'gh-pages'])
	call(['git', 'reset'])
	call(['git', 'commit', '--allow-empty', '-m', 'Initial commit'])
	call(['git', 'checkout', '--force', 'master'])
	call(['git', 'worktree', 'add', 'dist', 'gh-pages'])
	call(['hugo'])
	call(['cp', '-a', 'public/.', 'dist'])

	call(['git', 'add', '--all'], cwd=relpath('dist'))
	call(['git', 'commit', '-m', 'Deploy.'], cwd=relpath('dist'))
	call(['git', 'push', '--force', '--set-upstream', 'origin', 'gh-pages'], cwd=relpath('dist'))

	# shutil.rmtree(relpath('dist'))
	# rm dist


if __name__ == '__main__':
	main()
