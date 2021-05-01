import socket
import threading
import time
from _thread import start_new_thread, exit_thread
import pickle
import datetime
from os import system


def clear():
    _ = system("clear")


class Colors:
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    WARNING = "\033[93m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKGREEN = "\033[92m"


class Message:
    def __init__(self, message, sender, reciever):
        self.message = message
        self.time = datetime.datetime.today()
        self.sender = sender
        self.reciever = reciever


recent = ""
ls = []


def input_thread(client):
    def input_fx():
        global recent
        global ls
        reciever = input(
            f"{Colors.WARNING}{Colors.BOLD}:::: <``'[#]command or reciever('-r','-c')'``>----: "
        )
        if reciever == "-r":
            if recent != "":
                print(f"[---sending to----{recent}---]")
                reciever = recent
                data = input("\n:::: <``'Enter Message(-cc)'``> ::::")
                if data == "-cc":
                    print("Canceled")
                    input_fx()
                else:
                    ls.append(reciever)
                    ls.append(data)
                    return ls
            else:
                print(f"[---(error)----NO-RECENT-CHATS---]\n\n")
                input_fx()
        elif reciever == "-c":
            clear()
            input_fx()
        else:
            recent = reciever
            data = input(":::: <``'Enter Message(-cc)'``> ::::")
            if data == "-cc":
                print("Canceled")
                input_fx()
            else:
                ls.append(reciever)
                ls.append(data)
                return ls

    while True:
        input_fx()
        rcvr = ls
        payload = rcvr[1]
        thread = threading.Thread(
            target=client.connection.send, args=(payload, rcvr[0])
        )
        thread.start()
        ls.clear()


class Connection:
    def __init__(self, server_addr, server_port, connection_name):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_addr = server_addr
        self.server_port = server_port
        self.address = (self.server_addr, self.server_port)
        self.name = connection_name

    def reach(self):
        print(f"[*]{Colors.WARNING}Connecting to the server....")
        self.socket.connect(self.address)
        print(f"[+]{Colors.OKBLUE}Connected")
        self.thread = threading.Thread(target=self.listen, args=(None,))

    def listen(self, stuff):
        while True:
            try:
                data_out = pickle.loads(self.socket.recv(4096))
                print(
                    f"\n\n{Colors.BOLD}{Colors.OKGREEN}[MESSAGE FROM {data_out.sender}]"
                )
                print(f"======[Message]---:: {data_out.message}")
                print(f"======[time]---:: {data_out.time}")
                print("\n______________________________________________________")
                if data_out.sender == "TUNNEL_SERVER":
                    self.send(self.name, "TUNNEL_SERVER")
            except:
                pass

    def kill(self):
        self.socket.close()

    def send(self, message, reciever):
        try:
            self.socket.send(pickle.dumps(Message(message, self.name, reciever)))
        except:
            print("connection error")


class Client:
    def __init__(self, server_address, server_port, name):
        self.connection = Connection(server_address, server_port, name)
        self.name = name

    def connect(self):
        self.connection.reach()

    def destroy(self):
        self.connection.kill()

    def start_input_thread(self):
        self.input_thread = threading.Thread(target=input_thread, args=(self,))
        self.input_thread.start()
        self.connection.thread.start()


port = input("Enter Port: ")
name = input("Enter Username: ")
address = input("Enter address: ")
myclient = Client(address, int(port), name)
myclient.connect()
myclient.start_input_thread()
