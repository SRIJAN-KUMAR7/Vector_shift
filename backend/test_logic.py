from main import Pipeline, Node, Edge, parse_pipeline
from pydantic import BaseModel

def mock_parse(nodes_list, edges_list):
    pipeline = Pipeline(
        nodes=[Node(id=n) for n in nodes_list],
        edges=[Edge(source=e[0], target=e[1]) for e in edges_list]
    )
    return parse_pipeline(pipeline)

def test_logic():
    print("Running Direct Logic Verification Tests...\n")

    # 1. Empty Graph
    res = mock_parse([], [])
    assert res == {"num_nodes": 0, "num_edges": 0, "is_dag": True}
    print("PASSED: Empty Graph")

    # 2. Single Node
    res = mock_parse(["1"], [])
    assert res == {"num_nodes": 1, "num_edges": 0, "is_dag": True}
    print("PASSED: Single Node")

    # 3. Simple Chain (DAG)
    res = mock_parse(["1", "2", "3"], [("1", "2"), ("2", "3")])
    assert res == {"num_nodes": 3, "num_edges": 2, "is_dag": True}
    print("PASSED: Simple Chain")

    # 4. Self-loop (Cycle)
    res = mock_parse(["1"], [("1", "1")])
    assert res == {"num_nodes": 1, "num_edges": 1, "is_dag": False}
    print("PASSED: Self-loop")

    # 5. Simple Cycle
    res = mock_parse(["1", "2", "3"], [("1", "2"), ("2", "3"), ("3", "1")])
    assert res == {"num_nodes": 3, "num_edges": 3, "is_dag": False}
    print("PASSED: Simple Cycle")

    # 6. Disconnected DAG
    res = mock_parse(["1", "2", "3", "4"], [("1", "2"), ("3", "4")])
    assert res == {"num_nodes": 4, "num_edges": 2, "is_dag": True}
    print("PASSED: Disconnected DAG")

    res = mock_parse(["1", "2"], [("1", "2"), ("2", "99")])
    assert res == {"num_nodes": 2, "num_edges": 2, "is_dag": True}
    print("PASSED: Robustness Check")

    print("\nAll Tests Passed!")

res = mock_parse(
    ["A", "B", "C", "D"],
    [("A","B"), ("A","C"), ("B","D"), ("C","D")]
)
assert res == {"num_nodes": 4, "num_edges": 4, "is_dag": True}
print("PASSED: Diamond DAG")

if __name__ == "__main__":
    test_logic()
