import logging
import os
from logging.handlers import RotatingFileHandler

class ErrorPrefixFilter(logging.Filter):
    
    def filter(self, record):
        if record.levelno >= logging.ERROR:
            record.msg = f"ERROR: {record.msg}"
        return True


def setup_logging(log_dir = 'logs', log_file = 'app.log'):

    os.makedirs(log_dir, exist_ok = True)

    log_path = os.path.join(log_dir, log_file)
    handler = RotatingFileHandler(log_path, maxBytes=1_000_000, backupCount=5)
    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    )

    handler.setFormatter(formatter)
    handler.setLevel(logging.INFO)
    handler.addFilter(ErrorPrefixFilter())

    for h in logging.root.handlers[:]:
        logging.root.removeHandler(h)
    
    logging.root.addHandler(handler)
    logging.root.setLevel(logging.INFO)