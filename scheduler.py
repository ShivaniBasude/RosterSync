from jobs import Job
import time


class Scheduler:

    def __init__(self, jobs):

        self.jobs = jobs
        self.time = 0
        self.logs = []


    def get_ready_jobs(self):

        ready = []

        for job in self.jobs:

            if job.arrival_time <= self.time and not job.completed:

                ready.append(job)

        return ready


    def schedule(self):

        current_job = None

        while True:

            ready_jobs = self.get_ready_jobs()

            # ---------------------
            # AGING
            # ---------------------

            for job in ready_jobs:

                if job != current_job:

                    job.waiting_time += 1

                    if job.waiting_time >= 3 and job.priority > 1:

                        old_priority = job.priority

                        job.priority -= 1

                        job.waiting_time = 0

                        self.logs.append(

                            f"Aging Applied to {job.name}: "
                            f"{old_priority} -> {job.priority}"

                        )

            # ---------------------
            # NO READY JOBS
            # ---------------------

            if len(ready_jobs) == 0:

                self.time += 1

                if all(job.completed for job in self.jobs):

                    break

                continue

            # ---------------------
            # PRIORITY SORT
            # ---------------------

            ready_jobs.sort(key=lambda x: x.priority)

            highest_priority_job = ready_jobs[0]

            # ---------------------
            # CONTEXT SWITCH
            # ---------------------

            if current_job != highest_priority_job:

                if current_job is not None:

                    self.logs.append(

                        f"Context Switch: "
                        f"{current_job.name} -> "
                        f"{highest_priority_job.name}"

                    )

                current_job = highest_priority_job

            # ---------------------
            # EXECUTION
            # ---------------------

            self.logs.append(

                f"Time {self.time}: "
                f"{current_job.name} executing"

            )

            current_job.remaining_time -= 1

            time.sleep(1)

            # ---------------------
            # COMPLETION
            # ---------------------

            if current_job.remaining_time == 0:

                current_job.completed = True

                self.logs.append(

                    f"{current_job.name} finished."

                )

            self.time += 1

        self.logs.append("Scheduling Complete.")



# ----------------------------------
# FUNCTION FOR FLASK
# ----------------------------------

def get_scheduler_data():

    jobs = [

        Job("HugeBackup", 10, 15, 0),

        Job("Video1", 1, 3, 1),

        Job("Video2", 1, 3, 2),

        Job("OSUpdate", 2, 5, 4),

        Job("Analytics", 3, 6, 3),

        Job("DBReplication", 2, 5, 5)

    ]

    scheduler = Scheduler(jobs)

    scheduler.schedule()

    job_data = []

    for job in scheduler.jobs:

        status = "Completed"

        if not job.completed:

            status = "Waiting"

        job_data.append({

            "name": job.name,

            "priority": job.priority,

            "remaining": job.remaining_time,

            "status": status

        })

    return {

        "jobs": job_data,

        "logs": scheduler.logs

    }
