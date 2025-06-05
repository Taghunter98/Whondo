import logging
import os
from logging.handlers import RotatingFileHandler

class ErrorPrefixFilter(logging.Filter):
    
    def filter(self, record):
        if record.levelno >= logging.ERROR:
            record.msg = f"ERROR: {record.msg}"
        return True


def setup_logging():

    log_path = os.path('logs/app.log')
    handler = RotatingFileHandler(log_path, maxBytes=1_000_000, backupCount=5)
    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    )
    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)
    handler.addFilter(ErrorPrefixFilter())

    for h in logging:
        logging.root.removeHandler(h)
    
    logging.root.addHandler(handler)
    logging.root.setLevel(logging.INFO)