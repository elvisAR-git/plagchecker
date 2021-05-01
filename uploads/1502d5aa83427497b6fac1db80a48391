class Item():
    def __init__(self, name, price):
        self.name = name
        self.price = price


class ShoppingCart():
    def __init__(self):
        # A dictionary for you to use. Should map
        # Item -> quantity. Nothing else to do here!
        self.items = {}

    def add_items(self, item, quantity=1):
        # TODO: Your code here (3-7 lines)
        self.items[item] = quantity
        print("Added " + str(quantity) + " " + item.name +
              "(s) to Cart, at $" + str(item.price) + " each.")

    def get_total_price(self):
        pass  # TODO: Your code here (1-4 lines)
        total_price = 0.0
        for item, quantity in self.items.items():
            total_price = total_price + (item.price * quantity)
        return total_price

    def print_summary(self):
        pass  # TODO: Your code here (< 10 lines)
        print("============= Your Cart =============")

        for key, value in self.items.items():
            print(key.name + " (" + str(value) + ")" +
                  ": $" + str(key.price*value))
        print("Total Price:", self.get_total_price())
        print("=====================================")


if __name__ == '__main__':
    # Do NOT modify any code below this line.
    pizza = Item(name='Pizza', price=13.12)
    soap = Item(name='Soap', price=2.25)
    cookie = Item(name='Cookie', price=3.77)
    juice = Item(name='Juice', price=4.22)

    cart = ShoppingCart()
    cart.add_items(pizza, 2)
    cart.add_items(soap)
    cart.add_items(cookie, 5)
    cart.print_summary()
    cart.add_items(juice, 2)
    cart.print_summary()
