# coding=utf-8

# Requirements: Python, git, imagemagick convert. the pyyaml package, and imagemagick `convert` at the shell
import yaml
import glob
import os
from subprocess import call, check_output

def resize(inpath, width, outpath, quality='95%'): 
	'''Resize an image with imagemagick's `convert`.'''
	call(['convert', inpath, '-resize', '%sx>' % width, '-quality', quality, '-define', 'jpeg:preserve-settings', outpath])

def generate_if_needed(inpath, outpath, scale):
	'''Generate `outpath` from `inpath` if it doesn't exist or is outdated'''
	size_1x = 1000 # Output image width. Smaller images will be left alone and not upsampled.
	if not (os.path.exists(outpath) and os.path.getmtime(inpath) < os.path.getmtime(outpath)):
		print('Generating %s@%sx' % (name, scale))
		resize(inpath, scale * size_1x, outpath)

def relpath(path):
	'''Return a version of `path` relative to the directory of this script.'''
	here = os.path.dirname(os.path.realpath(__file__))
	return os.path.join(here, path)

def ensure_exists(path):
	'''Recursively create any neecssarly subdirectories.'''
	if not os.path.exists(path):
		os.makedirs(path)

def main():
	'''Update the assets repository and generate resized photos into `content/photo/images`.'''

	# Ensure assets exist and are up to date
	if os.path.exists('assets'):
		output = check_output(['git', 'status', '--porcelain'], cwd='assets')
		assert(len(output) == 0)
		print("Pulling latest assets.")
		call(['git', 'pull'], cwd='assets')
		pass
	else:
		call(['git', 'clone', 'https://github.com/yurivish/assets'])

	print("Generating images.")

	# The contents of this directory are ignored by git, so it may not exist.
	ensure_exists(relpath('content/photo/image'))

	# Iterate through all photo posts, then regenerate any missing or outdated images.
	for path in glob.glob(relpath('content/photo/*.md')):
		(name, ext) = os.path.splitext(os.path.basename(path)) # e.g. (flower, md)

		# Determine whether to use the edited or original photo
		original_path = relpath('assets/photo/original/%s.jpg' % name)
		edited_path   = relpath('assets/photo/edited/%s.jpg' % name)
		inpath = edited_path if os.path.exists(edited_path) else original_path
		assert(os.path.exists(inpath)) # Assert the input exists

		# Output paths. We might want to add thumbnails eventually.
		outpath_1x = relpath('content/photo/image/%s.jpg' % name)
		outpath_2x = relpath('content/photo/image/%s@2x.jpg' % name)

		generate_if_needed(inpath, outpath_1x, 1)
		generate_if_needed(inpath, outpath_2x, 2)

	print("Done.")

if __name__ == '__main__':
	main()
