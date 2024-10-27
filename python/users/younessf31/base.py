from typing import List

class point:
    x: float
    y: float

    def __init__(self, x_, y_) -> None:
        self.x = x_
        self.y = y_
    
    def to_point(self) -> List[float]:
        return [self.x, self.y]
    
    def __mul__(self, other):
        if (not isinstance(other, float)):
            return self.to_point()
        return [self.x * other, self.y * other]
    def __rmul__(self, other):
        return self * other
    

class airfoilFile:
    path: str
    arr: List[tuple]

    def __init__(self, _path) -> None:
        self.path = _path
        self.arr = self.read()

    def recenterX(self, offset=0.5) -> None:
        self.arr = [tuple([d[0] + offset, d[1]]) for d in self.arr]

    def scaleAndRecenterAtTrailingEdge(self, factor) -> None:
        max_ = max(d[0] for d in self.arr)
        self.scale(factor)
        max_2 = max(d[0] for d in self.arr)
        self.recenterX(max_ - max_2)

    def scaleAndRecenterAtLeadingEdge(self, factor) -> None:
        max_ = min(d[0] for d in self.arr)
        self.scale(factor)
        max_2 = min(d[0] for d in self.arr)
        self.recenterX(max_ - max_2)

    def scaleAndRecenterAtBothEdge(self, factor) -> None:
        min_ = min(d[0] for d in self.arr)
        max_ = max(d[0] for d in self.arr)
        self.scale(factor)
        max_2 = max(d[0] for d in self.arr)
        min_2 = min(d[0] for d in self.arr)
        self.recenterX((max_ +  min_ - max_2 - min_2))

    def scale(self, factor) -> None:
        self.arr = [tuple([d[0]*factor, d[1]*factor]) for d in self.arr]
    
    def read(self) -> List[tuple]:
        with open(self.path, "r") as f:
            lines = f.readlines()
        if lines.__len__() == 0:
            return []
        arr = []
        for line in lines[1:]:
            objs = line.strip().split(' ')
            if (len(objs) == 3):
                arr.append((float(objs[0]), float(objs[1] + objs[2])))
            else:
                arr.append((float(objs[0]), float(objs[1])))
        return arr

def correctPath(scriptfile, file):
    from os.path import dirname, realpath
    file_name = dirname(realpath(scriptfile)) + '/' + file
    return file_name
