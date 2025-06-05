import logging
import os
from logging.handlers import RotatingFileHandler
from flask import request, has_request_context

class ErrorPrefixFilter(logging.Filter):
    
    def filter(self, record):
        if record.levelno >= logging.ERROR:
            record.msg = f"ERROR: {record.msg}"
        return True

class RequestFormatter(logging.Formatter):
    def format(self, record):
        if has_request_context():
            record.url = request.url
            record.remote_addr = request.remote_addr
        else:
            record.url = None
            record.remote_addr = None

        return super().format(record)

def setup_logging(log_dir = 'logs', log_file = 'app.log'):

    os.makedirs(log_dir, exist_ok = True)

    log_path = os.path.join(log_dir, log_file)
    handler = RotatingFileHandler(log_path, maxBytes=1_000_000, backupCount=5)
    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    )
    request_formatter = RequestFormatter(
        '[%(asctime)s] %(remote_addr)s requested %(url)s\n'
        '%(levelname)s in %(module)s: %(message)s'
    )

    handler.setFormatter(formatter)
    handler.setFormatter(request_formatter)
    handler.setLevel(logging.INFO)
    handler.addFilter(ErrorPrefixFilter())

    for h in logging.root.handlers[:]:
        logging.root.removeHandler(h)
    
    logging.root.addHandler(handler)
    logging.root.setLevel(logging.INFO)