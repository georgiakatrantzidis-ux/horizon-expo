import glob

html_files = glob.glob('**/*.html', recursive=True)
for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace in links
    content = content.replace('917895556828', '919717927787')
    
    # Replace text formats
    content = content.replace('+91 78955 56828', '+91 97179 27787')
    content = content.replace('+91 789 555 6828', '+91 97179 27787')
    
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Updated numbers in {len(html_files)} files.")
