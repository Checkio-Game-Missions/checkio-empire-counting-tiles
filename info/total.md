We need to replace the floor tiles in our silos with new - stronger square tiles, but how many tiles we will need?

Each square tile has size of 1x1 meters. 
You need to calculate how many whole and partial tiles are needed for a circle with a radius of N meters. 
The center of the circle will be at the intersection of four tiles. For example: a circle with a radius of 2 metres
requires 4 whole tiles and 12 partial tiles.

![Tiles](counting-tiles.png.svg)

**Input:**  The radius of a circle as a float. 

**Output:** The quantities of whole and partial tiles as a list or tuple with two integers -- [solid, partial].

**Example:**

```python
tiles(2) == [4, 12]
tiles(3) == [16, 20]
tiles(2.1) == [4, 20]
tiles(2.5) == [12, 20]
```

**How it is used:**

This task is a simple geometry problem which uses concepts you can find in architecture and topography.
You can even use it to calculate the amount of materials needed for your own building project.

**Precondition:**

```python
0 < radius <= 4
```
