def fun_with_lists(list_a: list, list_b: list):
    print(list_a)
    print(list_b)

    # TODO: Step 1 (2 lines of code).
    if not len(list_a) >= 10 or not len(list_b) >= 10:
        return None

    print("After Step 1")

    # TODO: Step 2 (2 lines of code).
    list_a = list_a[0:11]
    list_b = list_b[-10:]

    print("After Step 2")
    print(list_a)
    print(list_b)

    # TODO: Step 3 (4 lines of code)
    list_c = []
    for x in range(10):
        list_c.append(list_a[x])
        list_c.append(list_b[x])

    print("After Step 3")
    print(list_c)

    # TODO: Step 4 (~1 line of code)
    list_c = list_c[::-5]
    print(list_c)

    # TODO: Step 5 (~6 lines of code)
    max_val = max(list_c)
    idx_max = list_c.index(max_val)

    # TODO: Step 6 (1 line of code)
    return (list_c, max_val, idx_max)


# For you to make sure you get the right output for the
# example given!
if __name__ == '__main__':
    u = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    v = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14]
    x, y, z = fun_with_lists(u, v)
    print(x)
    print(y)
    print(z)
