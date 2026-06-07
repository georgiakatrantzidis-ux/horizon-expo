import glob
import re

# 1. Update navigation
nav_old_root = """<li><a href="products/index.html">Men's &amp; Women's Suits</a></li>"""
nav_new_root = """<li><a href="products/mens-suits.html">Men's Suits Catalog</a></li>
                            <li><a href="products/womens-suits.html">Women's Suits Catalog</a></li>"""

nav_old_inner = """<li><a href="../products/index.html">Men's &amp; Women's Suits</a></li>"""
nav_new_inner = """<li><a href="../products/mens-suits.html">Men's Suits Catalog</a></li>
                            <li><a href="../products/womens-suits.html">Women's Suits Catalog</a></li>"""

html_files = glob.glob('**/*.html', recursive=True)
for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    if filepath == 'index.html':
        content = content.replace(nav_old_root, nav_new_root)
    else:
        content = content.replace(nav_old_inner, nav_new_inner)
        
    with open(filepath, 'w') as f:
        f.write(content)

# 2. Update products/index.html to be a hub
with open('products/index.html', 'r') as f:
    products_content = f.read()

# Replace Mens Suit Details
mens_start = products_content.find('<div class="product-details-grid">')
mens_end = products_content.find('</section>', mens_start)
if mens_start != -1 and mens_end != -1:
    replacement = """<div style="margin-top: 30px;">
                            <a href="mens-suits.html" class="btn btn-primary">View Full Catalog <i class="ph ph-arrow-right" style="margin-left: 8px;"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        """
    products_content = products_content[:mens_start] + replacement + products_content[mens_end:]

# Re-read for next replace to avoid shifting indices
with open('products/index.html', 'w') as f:
    f.write(products_content)

with open('products/index.html', 'r') as f:
    products_content = f.read()

# Replace Womens Suit Details (which is the next product-details-grid)
womens_start = products_content.find('<div class="product-details-grid">')
womens_end = products_content.find('</section>', womens_start)
if womens_start != -1 and womens_end != -1:
    replacement = """<div style="margin-top: 30px;">
                            <a href="womens-suits.html" class="btn btn-primary">View Full Catalog <i class="ph ph-arrow-right" style="margin-left: 8px;"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        """
    products_content = products_content[:womens_start] + replacement + products_content[womens_end:]

with open('products/index.html', 'w') as f:
    f.write(products_content)

print("Updated HTML files successfully.")
