# About `<script>` tag

- `<script>` tags block rendering by default, so it was/still is a common practice to put them at the end of document, right before `</body>`. Exceptions are `<script defer>` and `<script async>`
- `<script type="module">` is async by default, so `<script type="module" async>` is redundant.
- Injected scripts are async by default too.

```html
<script>
  const scriptEl = document.createElement('script');
  scriptEl.src = '/yall.min.js';

  document.head.appendChild(scriptEl);
</script>
```
