from jobs import Job
from scheduler import Scheduler

jobs = [

    Job("HugeBackup", 10, 15, 0),

    Job("Video1", 1, 3, 1),
    Job("Video2", 1, 3, 2),
    Job("Video3", 1, 3, 3),

    Job("OSUpdate", 2, 5, 4),
    Job("EmailSync", 4, 3, 1),
    Job("Analytics", 3, 6, 3),
    Job("DBReplication", 2, 5, 5)

]

scheduler = Scheduler(jobs)

scheduler.schedule()