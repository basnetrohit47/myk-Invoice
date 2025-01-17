
// Set a key-value pair in storage (handles any type of data)
export const setStoreValue = <T>(key: string, value: T) => {
  if (typeof window !== "undefined") {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }


};

// Get a value by key from storage (returns the correct type based on the generic)
export const getStoreValue = <T>(key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }
  else {
    return null
  }

};

export const removeStoreValue = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }

};



