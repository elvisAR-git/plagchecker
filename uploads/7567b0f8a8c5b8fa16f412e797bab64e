import random
# Here is how I might approach this problem.
# Those functions commented out do not exist(yet),
# but once you come up with this "main loop/logic"
# using English, you can then assume each function
# does as it's supposed to!

# get the names
player = input("Enter your name here -----------> ")
p_monster = input("Enter your monster's name here ------> ")

rival = input("Enter your rival's name here ---> ")
r_monster = input("Enter rival's monster's name here ------> ")
print()

# Plays a single monster battle


def play_game():
    turn_count = 0
    p_hp = 33
    r_hp = 20

    # Print Introduction
    print("You will engage in a grueling monster battle. Let's begin!")
    print()

    while not game_over(p_hp, r_hp):
        print_status(turn_count, p_hp, r_hp)
        print_moves()
        choice = int(choose_move())
        r_hp = p_attack(choice, r_hp)
        p_hp = r_attack(p_hp)
        turn_count += 1

    if (p_hp < 0) & (r_hp < 0):
        print("Therefore, we have a TIE!!!")
    elif(p_hp > r_hp):
        print("Therefore, the WINNER is " + p_monster + "!!!")
    else:
        print("Therefore, the WINNER is " + r_monster + "!!!")

# Checks to see whether or not the game is over
# returns a boolean


def game_over(p_hp, r_hp):
    return (p_hp <= 0) | (r_hp <= 0)

# Prints the move list


def print_moves():
    print("====================== MOVE LIST ========================")
    print("1 for Friendly Nudge")
    print("2 for Surrender ")
    print("3 for Heal Opponent")
    print("====================== MOVE LIST ========================")
    print()

# Prints the health of both monsters, and the number of turns that have passed


def print_status(turn_count, p_hp, r_hp):
    print("================= BEGIN STATUS UPDATE ===================")
    print(p_monster + " currently has " + str(p_hp) + " HP.")
    print(r_monster + " currently has " + str(r_hp) + " HP.")
    print("It has been " + str(turn_count) + " turn(s) so far.")
    print("================== END STATUS UPDATE ====================")
    print()


# Prompt the user which move they would like to perform until
# they choose a valid move.
# returns the move the user picked.
def choose_move():
    valid_choice = False
    while(not valid_choice):
        choice = input("Choose what move to perform from the above list -> ")
        valid_choice = (choice == "1") or (choice == "2") or (choice == "3")
        if (not valid_choice):
            print("That's not a valid option!")
            print()
    return choice

# The player performs an attack
# returns the rival monster's new health


def p_attack(choice, r_hp):
    if (choice == 1):
        print("Your " + p_monster + " used Friendly Nudge! It did 9 damage")
        print()
        return r_hp - 9
    elif (choice == 2):
        print("Your " + p_monster + " used Play Dead. It did 0 damage")
        print()
        return r_hp
    else:
        print("Your " + p_monster + " healed the opposing " +
              r_monster + " by 4 hp")
        print()
        return r_hp + 4

# The rival performs an attack
# returns the player monster's new health


def r_attack(p_hp):
    r_choice = random.randint(1, 3)
    if (r_choice == 1):
        print("The opposing " + r_monster +
              " used Friendly Nudge! It did 9 damage")
        print()
        return p_hp - 9
    elif (r_choice == 2):
        print("The opposing " + r_monster + " used Play Dead. It did 0 damage")
        print()
        return p_hp
    elif (r_choice == 3):
        print("The opposing " + r_monster +
              " healed your " + p_monster + " by 4 hp")
        print()
        return p_hp + 4


if __name__ == '__main__':
    play_game()
