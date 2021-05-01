from itertools import chain


def reverse_roster(fn_dict: dict) -> dict:
    # TODO: Your code here (~ 10-20 lines of code)

    first_names = []
    for key in fn_dict.keys():
        first_names.append(key)

    last_names = []

    for first_name in first_names:
        last_names.append((fn_dict[first_name]))

    last_names = list(chain(*last_names))

    main_dict = {}
    for last_name in last_names:
        main_dict[last_name] = []
        for first_name in first_names:
            if last_name in fn_dict[first_name]:
                main_dict[last_name].append(first_name)
                main_dict[last_name].sort()
    return(main_dict)


if __name__ == '__main__':
    sample = {'Alice': ['Smith', 'Chan'],
              'Bob': ['Smith'], 'Fred': ['Agarwal']}
    print(reverse_roster(sample))
