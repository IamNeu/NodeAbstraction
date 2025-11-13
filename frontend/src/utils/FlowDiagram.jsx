export default function arrangeNodesInRows(nodes, containerWidth = 1200, nodeWidth = 260, nodeHeight = 140, spacing = 40) {
  let x = 0;
  let y = 0;

  return nodes.map((node) => {
    if (x + nodeWidth > containerWidth) {
      x = 0;
      y += nodeHeight + spacing;
    }

    const positioned = {
      ...node,
      position: { x, y }
    };

    x += nodeWidth + spacing;
    return positioned;
  });
}
