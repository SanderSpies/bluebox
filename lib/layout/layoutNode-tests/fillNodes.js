function fillNodes(node) {
  if (!node.layout) {
    node.layout = {
      width: undefined,
      height: undefined,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
  }

  if (!node.props) {
    node.props = {};
  }

  if (!node.style) {
    node.style = {};
  }

  if (!node.children) {
    node.children = [];
  }
  node.children.forEach(fillNodes);
  return node;
}

module.exports = fillNodes;