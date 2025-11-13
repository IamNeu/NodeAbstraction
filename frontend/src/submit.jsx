// src/submit.js

export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) throw new Error("Bad response from backend");

    const data = await response.json();

    alert(`Pipeline submitted!

 Nodes: ${data.num_nodes}
 Edges: ${data.num_edges}
 Is DAG: ${data.is_dag ? 'Yes' : 'No'}`);
  } catch (error) {
    console.error(" Submission failed:", error);
    alert(" Failed to submit pipeline. See console for details.");
  }
}
