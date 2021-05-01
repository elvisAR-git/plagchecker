x = int(input("Please enter a (positive) integer -> "))

# TODO: Your code below!
# Python Program to find the factors of a number

rec = []
while True:
    val = x / 2
    rem = x % 2
    if rem == 0:
        rec.append(2)
    else:
        rec.append(int(x))
        break
    x = val

str_out = ""

counter = 0
for num in rec:
    if counter == 0:
        if num != 1:
            str_out = str(num)
    else:
        if num != 1:
            str_out = str_out + " * " + str(num)
    counter += 1

print("The 2's decomposition is ---------->", str_out)
