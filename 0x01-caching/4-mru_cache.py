#!/user/bin/env python3
"""defines a caching system class MRUCache"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """A caching system class"""
    def __init__(self):
        """initializes a MRUCache object"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """assign a key value pair to the dictionary cache_data"""
        if key and item:
            if key in self.cache_data:
                self.cache_data.move_to_end(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key, _ = self.cache_data.popitem()
                print(f'DISCARD: {discarded_key}')
            self.cache_data[key] = item

    def get(self, key):
        """returns a value in the cached_data with specified key"""
        if key and key in self.cache_data:
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
