from apscheduler.schedulers.background import BackgroundScheduler
from ..views import testHourly


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(testHourly, 'interval', seconds=5)
    scheduler.start()
