---
# https://cloudcannon.com/blog/bundling-javascript-for-jekyll
layout: null
dir_path: scripts/
scripts:
  - navbar.js
  - picture-gallery.js
---
{% for script in page.scripts %}
    {% assign script_path = page.dir_path | append: script %}
    (function () {
        {% include_relative {{script_path}} %}
    })();
{% endfor %}
