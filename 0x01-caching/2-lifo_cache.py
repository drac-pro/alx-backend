#!/user/bin/env python3
"""defines a caching system class LIFOCache"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """A caching system class"""
    def __init__(self):
        """initializes a LIFOCache object"""
        super().__init__()

    def put(self, key, item):
        """assign a key value pair to the dictionary cache_data"""
        if key and item:
            if key not in self.cache_data.keys() and \
                    len(self.cache_data) >= super().MAX_ITEMS:
                last_key, _ = self.cache_data.popitem()
                print(f'DISCARD: {last_key}')
            self.cache_data[key] = item

    def get(self, key):
        """returns a value in the cached_data with specified key"""
        return self.cache_data.get(key)
