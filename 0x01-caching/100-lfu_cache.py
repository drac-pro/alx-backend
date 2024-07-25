#!/user/bin/env python3
"""defines a caching system class LFUCache"""
from collections import defaultdict
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """A caching system class"""
    def __init__(self):
        """initializes a LFUCache object"""
        super().__init__()
        self.access_counts = defaultdict(int)

    def put(self, key, item):
        """assign a key value pair to the dictionary cache_data"""
        if key and item:
            if key in self.cache_data:
                self.cache_data[key] = item
                self.access_counts[key] += 1
            else:
                if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                    min_access_count = min(self.access_counts.values())
                    lfu_keys = [k for k, v in self.access_counts.items()
                                if v == min_access_count]
                    if lfu_keys:
                        lfu_key = lfu_keys[0]
                        self.cache_data.pop(lfu_key)
                        self.access_counts.pop(lfu_key)
                        print(f'DISCARD: {lfu_key}')
                self.cache_data[key] = item
                self.access_counts[key] += 1

    def get(self, key):
        """returns a value in the cached_data with specified key"""
        if key and key in self.cache_data:
            self.access_counts[key] += 1
            return self.cache_data[key]
