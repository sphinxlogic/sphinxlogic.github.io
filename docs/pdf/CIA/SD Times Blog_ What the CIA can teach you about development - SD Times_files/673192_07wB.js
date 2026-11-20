var containerId = "buzzsprout-large-player"
var buzzsproutPlayerContainer = document.getElementById(containerId);

function renderBuzzsproutPlayerHTML() {
   return unescape("<div class=\"episode\">\n<iframe id=\"player_iframe\" src=\"https://www.buzzsprout.com/673192?client_source=large_player&amp;iframe=true&amp;referrer=https%3A%2F%2Fwww.buzzsprout.com%2F673192.js%3Fcontainer_id%3Dbuzzsprout-large-player%26player%3Dlarge\" width=\"100%\" height=\"375\" frameborder=\"0\" scrolling=\"no\" title=\"What the Dev?\"><\/iframe>\n<\/div>\n"); 
 }

if (buzzsproutPlayerContainer) {
  buzzsproutPlayerContainer.innerHTML = renderBuzzsproutPlayerHTML();
} else {
  document.write(renderBuzzsproutPlayerHTML());
}
