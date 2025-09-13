if (navigation.addEventListener) {
  navigation.addEventListener("navigate", (event) => {
    if (!event.destination.url.includes(document.location.origin)) {
      return;
    }

    event.intercept({
      handler: async () => {
        const response = await fetch(event.destination.url);
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // Inicia la transición sin borrar el contenido original inmediatamente
        const transition = document.startViewTransition(() => {
          // Solo cambiar el contenido después de que la animación termine
          //transition.finished.then(() => {
            document.body.replaceChildren(...doc.body.children);
            document.title = doc.title || "Nueva Página";
          //});
        });

        transition.ready.then(() => {
          window.scrollTo(0, 0);
        });
      },
      scroll: "manual",
    });
  });
}
