"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    key_gen.py
Author:      Josh Bassett
Date:        23/06/2025
Version:     1.0

Description: Provides function for creating API keys.
"""

import secrets


def gen_key() -> str:
    """
    Function generates url safe API keys of 30 char length.

    Returns:
        str: API key
    """
    return secrets.token_urlsafe(30)