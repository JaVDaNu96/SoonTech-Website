#!/bin/bash
# Script to add i18n.js to all HTML pages that don't have it yet

# List of files to update
files=(
    "about-us.html"
    "contact-us.html"
    "support.html"
    "blog.html"
)

for file in "${files[@]}"; do
    filepath="src/$file"
    if [ -f "$filepath" ]; then
        # Check if i18n.js is already present
        if ! grep -q "i18n.js" "$filepath"; then
            # Add i18n.js after includes.js
            sed -i 's|<script src="includes.js" defer></script>|<script src="includes.js" defer></script>\n    <script type="module" src="i18n.js"></script>|' "$filepath"
            echo "✅ Added i18n.js to $file"
        else
            echo "⏭️  $file already has i18n.js"
        fi
    else
        echo "❌ File not found: $filepath"
    fi
done

echo ""
echo "🎉 Script complete!"
