import glob

html_files = glob.glob('**/*.html', recursive=True)
for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace em-dash with comma and space
    content = content.replace(' — ', ', ')
    content = content.replace('— ', ', ')
    content = content.replace(' —', ', ')
    content = content.replace('—', ',')
    
    # Some specific cleanups where comma doesn't make sense or creates double punctuation
    content = content.replace(', .', '.')
    content = content.replace('.,', '.')
    
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Removed dashes from {len(html_files)} files.")
