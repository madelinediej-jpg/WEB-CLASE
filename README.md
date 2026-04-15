 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
new file mode 100644
index 0000000000000000000000000000000000000000..712d1872b72d160016b12a74591d590cd748eac5
--- /dev/null
+++ b/README.md
@@ -0,0 +1,19 @@
+# WEB-CLASE
+
+Preview local rápido para ver la landing.
+
+## Opción 1 (npm)
+```bash
+npm run preview
+```
+Luego abre: `http://localhost:5500/index.html`
+
+## Opción 2 (script)
+```bash
+./preview.sh
+```
+Puedes cambiar puerto:
+```bash
+./preview.sh 8080
+```
+Luego abre: `http://localhost:8080/index.html`
 
EOF
)
