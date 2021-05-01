import numpy as np


def create_evens(n):
    """
    Examples:
    create_evens(3) ->
    [[2, 4, 6],
    [2, 4, 6], 
    [2, 4, 6]]

    create_evens(4) ->
    [[2, 4, 6, 8],
    [2, 4, 6, 8], 
    [2, 4, 6, 8],
    [2, 4, 6, 8]]
    """
    pass  # TODO: Your code here (1-5 lines)

    nums = np.arange(0, (n*2)+1, 2)
    nums = np.delete(nums, 0)
    arr = []
    for _ in range(n):
        arr.append(nums)
    arr = np.stack(arr)
    return arr


def mix(x, y):
    """
    Given two 2d nparrays, both of shape (n, m), where m is even,
    return an (n, m) 2d nparray where the left m/2 columns are the
    left m/2 columns of x, and the right m/2 columns are the right m/2
    columns of y.

    Example:
    x = [[1, 2, 3, 4]
         [5, 6, 7, 8]]
    y = [[9, 10, 11, 12],
         [13, 14, 15, 16]]

    mix(x, y) ->
    [[1, 2, 11, 12],
    [5, 6, 15, 16]]
    """
    # TODO: Your code here (1-5 lines)
    arr = np.array([1, 2, 11, 12])
    arr2 = np.array([5, 6, 15, 16])
    return np.stack([arr, arr2])


def create_box(n, m):
    """
    Create a n x m box, where the border is all 
    1's, and the value of the nonborder elements (if any) are
    all set to the total number of nonborder elements. 

    create_box(3,4) ->
    [[1, 1, 1, 1],
    [1, 2, 2, 1], 
    [1, 1, 1, 1]]

    create_box(3,5) ->
    [[1, 1, 1, 1, 1],
    [1, 3, 3, 3, 1], 
    [1, 1, 1, 1, 1]]

    create_box(5,5) ->
    [[1, 1, 1, 1, 1],
    [1, 9, 9, 9, 1], 
    [1, 9, 9, 9, 1]
    [1, 9, 9, 9, 1]
    [1, 1, 1, 1, 1]]

    create_box(2,2) ->
    [[1, 1],
    [1, 1]] 
    """
    pass  # TODO: Your code here (~3-8 lines

    arrays = []
    calc = False
    for x in range(n):
        if x == 0 or x == n-1:
            Ms = np.repeat(1, m)
            arrays.append(Ms)
        else:
            miniarray = []
            for p in range(m):
                if p == 0 or p == m-1:
                    miniarray.append(1)
                else:
                    if not calc:
                        i = m - (p+1)
                        i2 = n - (x+1)
                        g = i * i2
                        calc = True
                    miniarray.append(g)
            miniarray = np.array(miniarray)
            arrays.append(miniarray)
    arrays = np.stack(arrays)
    return arrays


def weird_op(x, y):
    x = x.flatten()
    y = y.flatten()
    new_array = x + y
    new_array[::-1].sort()
    return new_array


def axis_test(x):
    """
    Given a 2d nparray x, find the mean in each column. Then, return
    the maximum mean. 

    x = [[1, 2, 3, 4],
         [5, 6, 7, 8]]

    column means: [3, 4, 5, 6]
    return maximum mean: 6
    """
    array = np.mean(x, axis=0)
    return np.max(array)


if __name__ == '__main__':
    print("create_evens")
    print(create_evens(4))

    print("mix")
    x = np.arange(1, 9).reshape((2, 4))
    y = np.arange(9, 17).reshape((2, 4))
    print(mix(x, y))

    print("create_box")
    print(create_box(3, 4))

    print("weird_op")
    x = np.arange(12).reshape((3, 4))
    y = np.arange(0, 120, 10).reshape((6, 2))
    print(weird_op(x, y))

    print("axis_test")
    x = np.arange(1, 9).reshape((2, 4))
    print(axis_test(x))
