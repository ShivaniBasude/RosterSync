from jobs import Job
import time

class Scheduler:

    def __init__(self, jobs):

        self.jobs = jobs
        self.time = 0

    def get_ready_jobs(self):

        ready = []

        for job in self.jobs:

            if job.arrival_time <= self.time and not job.completed:
                ready.append(job)

        return ready

    def schedule(self):

        print("\n=== PREEMPTIVE PRIORITY SCHEDULING ===\n")

        current_job = None

        while True:

            ready_jobs = self.get_ready_jobs()

            for job in ready_jobs:

                if job != current_job:

                    job.waiting_time += 1

                    if job.waiting_time >= 3 and job.priority > 1:

                        job.priority -= 1

                        print(f"Aging Applied to {job.name}")

            if len(ready_jobs) == 0:

                self.time += 1

                if all(job.completed for job in self.jobs):
                    break

                continue

            ready_jobs.sort(key=lambda x: x.priority)

            highest_priority_job = ready_jobs[0]

            if current_job != highest_priority_job:

                if current_job is not None:
                    print(f"\nContext Switch: {current_job.name} -> {highest_priority_job.name}")

                current_job = highest_priority_job

            print(f"\nTime {self.time}: {current_job.name} executing")

            current_job.remaining_time -= 1

            time.sleep(1)

            if current_job.remaining_time == 0:

                current_job.completed = True

                print(f"{current_job.name} finished.")

            self.time += 1

        print("\nScheduling Complete.")