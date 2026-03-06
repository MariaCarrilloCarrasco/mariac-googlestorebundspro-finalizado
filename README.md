# 📘 Guía de trabajo en equipo — 02-Ejercicio-Google-Store

Hola equipo! 👋 Esta guía explica paso a paso cómo trabajar en el repositorio sin romper nada. Léela con calma antes de empezar.

---

## 🌿 ¿Cómo está organizado el repositorio?

| Rama        | Para qué sirve                                                |
| ----------- | ------------------------------------------------------------- |
| `main`      | Código final en producción. **Nadie sube aquí directamente.** |
| `develop`   | Rama de integración. **Tampoco se sube directamente.**        |
| `tu-nombre` | Tu rama personal. **Aquí es donde tú trabajas.**              |

> ⚠️ **Regla de oro:** Nunca hagas cambios directamente en `main` ni en `develop`. Todo tu trabajo va en tu rama personal.

---

## 🚀 Flujo de trabajo paso a paso

### 1️⃣ Abre tu proyecto en VS Code

Abre la carpeta del proyecto en VS Code. Puedes hacerlo desde la terminal integrada con:

```bash
code .
```

---

### 2️⃣ Verifica en qué rama estás

Antes de tocar cualquier archivo, asegúrate de estar en **tu rama personal**.

Abre la terminal de VS Code (`Ctrl + ñ` o `View > Terminal`) y escribe:

```bash
git branch
```

Verás una lista de ramas. La que tiene `*` al lado es en la que estás. Debe ser la tuya (por ejemplo `maria`).

---

### 3️⃣ Cámbiate a tu rama si no estás en ella

```bash
git checkout tu-nombre
```

> 💡 Reemplaza `tu-nombre` con el nombre de tu rama real. Ejemplo: `git checkout maria`

---

### 4️⃣ Actualiza tu rama con los últimos cambios de `develop`

Antes de empezar a trabajar, sincroniza tu rama para no quedarte atrás:

```bash
git pull origin develop
```

> 🔄 Esto trae los cambios más recientes que ya fueron aprobados al proyecto.

---

### 5️⃣ Trabaja en tus archivos

Ahora sí puedes editar, crear o modificar archivos en VS Code con tranquilidad.

---

### 6️⃣ Guarda tus cambios con Git

Cuando termines (o quieras guardar avance), sigue estos tres pasos:

**Paso A — Ver qué archivos cambiaste:**

```bash
git status
```

Los archivos en rojo son los que modificaste y aún no guardaste en Git.

**Paso B — Agregar los archivos:**

```bash
git add .
```

> El punto `.` significa "agrega todos los cambios". Puedes también agregar uno por uno con `git add nombre-del-archivo`.

**Paso C — Hacer el commit (guardar con mensaje):**

```bash
git commit -m "descripción breve de lo que hiciste"
```

> ✏️ Ejemplos de buenos mensajes:
>
> - `"agrego sección de productos"`
> - `"corrijo error en el navbar"`
> - `"añado estilos al footer"`

---

### 7️⃣ Sube tu rama a GitHub

```bash
git push origin tu-nombre
```

> 💡 Ejemplo: `git push origin maria`

---

### 8️⃣ Crea un Pull Request en GitHub

Un Pull Request (PR) es una solicitud para que tu código sea revisado y luego unido a `develop`.

1. Ve al repositorio en GitHub: [github.com/Adriasu09/02-Ejercicio-Google-Store](https://github.com/Adriasu09/02-Ejercicio-Google-Store)
2. Verás un banner amarillo que dice **"Compare & pull request"** → haz clic ahí
3. Asegúrate de que la configuración sea:
   - **base:** `develop` ← hacia donde va tu código
   - **compare:** `tu-nombre` ← tu rama con los cambios
4. Escribe un **título claro** que describa qué hiciste
5. En la descripción puedes explicar brevemente los cambios
6. Haz clic en **"Create pull request"** ✅

> ⏳ A partir de aquí, Adriana revisará tu PR. Puede que te deje comentarios pidiendo ajustes. Si eso pasa, no te preocupes — es parte del proceso de aprendizaje!

---

### 9️⃣ Si te piden hacer cambios en el PR

1. Vuelve a VS Code
2. Asegúrate de estar en tu rama: `git checkout tu-nombre`
3. Haz los cambios que te pidieron
4. Repite los pasos 6 y 7 (add → commit → push)
5. El PR se actualizará automáticamente en GitHub 🔄

---

## ❓ Errores comunes

**"You are not on the right branch"**
→ Usa `git checkout tu-nombre` para cambiarte a tu rama.

**"Please commit your changes or stash them before you merge"**
→ Tienes cambios sin guardar. Haz `git add .` y `git commit -m "tu mensaje"` primero.

**"Rejected — non-fast-forward"**
→ Alguien hizo cambios antes que tú. Corre `git pull origin tu-nombre` primero y luego vuelve a intentar el push.

---

## 💬 Resumen rápido (para tener a mano)

```bash
git checkout tu-nombre          # cambiarte a tu rama
git pull origin develop         # actualizar con lo último
# ... trabajas en VS Code ...
git status                      # ver cambios
git add .                       # preparar cambios
git commit -m "tu mensaje"      # guardar cambios
git push origin tu-nombre       # subir a GitHub
# → Ir a GitHub y abrir el Pull Request
```

---

> 🙌 Cualquier duda, pregúntale a Adriana antes de hacer algo que no estés segura. ¡Es mejor preguntar que romper el código!
