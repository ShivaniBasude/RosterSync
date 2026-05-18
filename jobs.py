import threading
import time

class Job(threading.Thread):

    def __init__(self, name, priority, burst_time, arrival_time):
        threading.Thread.__init__(self)

        self.name = name
        self.priority = priority
        self.burst_time = burst_time
        self.remaining_time = burst_time
        self.arrival_time = arrival_time

        self.waiting_time = 0
        self.completed = False

    def run(self):

        while self.remaining_time > 0:

            print(f"{self.name} running... Remaining: {self.remaining_time}")

            time.sleep(1)

            self.remaining_time -= 1

        self.completed = True

        print(f"{self.name} completed.")