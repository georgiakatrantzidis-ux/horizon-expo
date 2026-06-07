import os

css_path = 'css/style.css'
with open(css_path, 'r') as f:
    lines = f.readlines()

def get_lines(start, end):
    # start and end are 1-indexed
    # if end is None, go to end of file
    if end is None:
        return ''.join(lines[start-1:])
    return ''.join(lines[start-1:end])

global_css = get_lines(1, 151) + get_lines(1806, None)
layout_css = get_lines(152, 245) + get_lines(680, 751)
home_css = get_lines(246, 679)
about_quality_css = get_lines(911, 1148) + get_lines(1447, 1623)
products_css = get_lines(1149, 1384)
process_contact_css = get_lines(1385, 1446) + get_lines(1624, 1805)
responsive_css = get_lines(752, 910)

with open('css/global.css', 'w') as f: f.write(global_css)
with open('css/layout.css', 'w') as f: f.write(layout_css)
with open('css/home.css', 'w') as f: f.write(home_css)
with open('css/about_quality.css', 'w') as f: f.write(about_quality_css)
with open('css/products.css', 'w') as f: f.write(products_css)
with open('css/process_contact.css', 'w') as f: f.write(process_contact_css)
with open('css/responsive.css', 'w') as f: f.write(responsive_css)

new_style_css = """/* Horizon Exports Main Style File */
@import url('global.css');
@import url('layout.css');
@import url('home.css');
@import url('about_quality.css');
@import url('products.css');
@import url('process_contact.css');
@import url('responsive.css');
"""

with open(css_path, 'w') as f: f.write(new_style_css)

print("Split completed successfully!")
