#!/usr/bin/env python3
"""defines a caching system class BasicCache"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """A caching system class"""
    def __init__(self):
        """initializes a BasicCache object
        """
        super().__init__()

    def put(self, key, item):
        """assign a key value pair to the dictionary cache_data"""
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """returns a value in the cached_data with specified key"""
        return self.cache_data.get(key)
