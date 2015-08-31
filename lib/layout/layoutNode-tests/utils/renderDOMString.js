var style = document.createElement('style');
style.innerHTML = "body {" +
                "margin: 0;" +
                "padding: 0;" +
                "}" +
                "div, span {" +
                "box-sizing: border-box;" +
                "position: relative;" +
                "border: 0 solid black;" +
                "margin: 0;" +
                "padding: 0;" +
                "display: flex;" +
                "flex-direction: column;" +
                "align-items: stretch;" +
                "justify-content: flex-start;" +
                "flex-shrink: 0;" +
  "align-content: flex-start;",
                "width: 100%;" +
                "}";

document.head.appendChild(style);

function renderDOMString(str) {
  document.body.style.flexDirection = 'column';
  document.body.innerHTML = str;
}

module.exports = renderDOMString;