# ! /usr/bin/python3.8
import socket
import threading
import time
from _thread import start_new_thread, exit_thread
import pickle
import datetime
from os import system


class Colors:
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    WARNING = "\033[93m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKGREEN = "\033[92m"


class Server:
    def __init__(self, address, port):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.address = address
        self.port = port
        self.client_threads = []
        self.clients = []

    def listen(self):
        try:
            self.socket.bind((self.address, self.port))
            self.socket.listen()
            _ = system("clear")
            print(
                f"{Colors.BOLD}{Colors.OKBLUE}::**:e:**:l:**:v:**:i:**:s:**:t:**:o:**:o:**:l:**:s:**::"
            )
            print(
                f"{Colors.BOLD}{Colors.OKGREEN}[TUNNEL V1.0.2 STARTED AT: {self.address}:{self.port}]\nUser Control+C to stop the server\n\n"
            )
        except:
            print("ERROR: could not start the server at the specified port")

        while True:
            try:
                conn, addr = self.socket.accept()
                print(
                    f"{Colors.WARNING}[+]{datetime.datetime.today()}--connected to:{addr}"
                )
                newthread = start_new_thread(client_thread, (conn, addr, self))
                self.client_threads.append(newthread)

            except socket.error:
                SystemExit()
            except KeyboardInterrupt:
                print("[!]Server Closed")
                self.socket.close()
                break


class Message:
    def __init__(self, message, sender, reciever):
        self.message = message
        self.time = datetime.datetime.today()
        self.sender = sender
        self.reciever = reciever


def client_thread(conn, addr, server):
    conn.send(pickle.dumps(Message("Connection successful", "TUNNEL_SERVER", addr)))
    user_token = pickle.loads(conn.recv(4096))
    print(
        f"{Colors.OKBLUE}[+]{datetime.datetime.today()}--Recieved user token from {user_token.sender}"
    )
    server.clients.append({"conn": conn, "addr": addr, "username": user_token.sender})
    while True:
        try:
            message = pickle.loads(conn.recv(4096))
            for client in server.clients:
                if client.get("username") == message.reciever:
                    try:
                        client.get("conn").send(pickle.dumps(message))
                        print(
                            f"[+]{Colors.OKGREEN}{datetime.datetime.today()}--Routing message to {client.get('addr')}----:::"
                        )
                        break
                    except:
                        print(
                            f"{Colors.FAIL}{datetime.datetime.today()}--[!]client {client.get('addr')} is unreachable----:::"
                        )
        except:
            pass


port = input("enter port: ")
address = input("enter address: ")
myserver = Server(address, int(port))
myserver.listen()
