---
# https://cloudcannon.com/blog/bundling-javascript-for-jekyll
layout: null
dir_path: scripts/
scripts:
  - navbar.js
---
{% for script in scripts %}
    {% assign script_path = dir_path | append: script %}
    (function () {
        {% include_relative script_path %}
    })();
{% endfor %}
