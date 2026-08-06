#!/bin/sh
# Bouwt index.html (de gehoste app) uit caveau.html (de bron, ook gebruikt voor de Claude-artifact).
cd "$(dirname "$0")" || exit 1
{ cat head.html; cat caveau.html; printf '\n</body>\n</html>\n'; } > index.html
echo "index.html opnieuw gebouwd ($(wc -c < index.html) bytes)"
