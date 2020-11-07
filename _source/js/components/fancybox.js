/* Fancybox init */
function initFancybox() {
  $('[data-fancybox="gallery"]').fancybox({
    protect: true,
    buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"],
  });
}
