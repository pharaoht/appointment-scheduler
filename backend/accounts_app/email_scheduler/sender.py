from apscheduler.schedulers.background import BackgroundScheduler
from ..views import testHourly


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(testHourly, trigger='cron', hour='07', minute='30')
    scheduler.start()


# scheduler.add_job(testHourly, trigger='cron', hour='07', minute='30')
