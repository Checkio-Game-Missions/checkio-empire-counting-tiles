"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": 2,
            "answer": [4, 12]
        },
        {
            "input": 3,
            "answer": [16, 20]
        },
        {
            "input": 2.1,
            "answer": [4, 20]
        },
        {
            "input": 2.5,
            "answer": [12, 20]
        },
        {
            "input": 1,
            "answer": [0, 4]
        },
        {
            "input": 4,
            "answer": [32, 28]
        },
        {
            "input": 0.5,
            "answer": [0, 4]
        },
        {
            "input": 3.5,
            "answer": [24, 28]
        },
        {
            "input": 3.8,
            "answer": [32, 28]
        }
    ],
    "Extra": [

        {
            "input": 1.1,
            "answer": [0, 12]
        },
        {
            "input": 2.2,
            "answer": [4, 20]
        },
        {
            "input": 3.3,
            "answer": [24, 28]
        },
        {
            "input": 0.9,
            "answer": [0, 4]
        },
        {
            "input": 2.7,
            "answer": [12, 20]
        },
        {
            "input": 3.4,
            "answer": [24, 28]
        },
        {
            "input": 0.1,
            "answer": [0, 4]
        }
    ]
}
