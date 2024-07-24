#!/usr/bin/env python3
"""defines a caching system class FIFOCache"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """A caching system class"""
    def __init__(self):
        """initializes a FIFOCache object"""
        super().__init__()

    def put(self, key, item):
        """assign a key value pair to the dictionary cache_data"""
        if key and item:
            if len(self.cache_data) > super().MAX_ITEMS:
                discarded = next(iter(self.cache_data))
                self.cache_data.pop(discarded)
                print(f'DISCARD: {discarded}')
            self.cache_data[key] = item

    def get(self, key):
        """returns a value in the cached_data with specified key"""
        return self.cache_data.get(key)
