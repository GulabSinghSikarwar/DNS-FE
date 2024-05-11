// Function to save data to local storage with key-value pair
class Storage {

    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            console.log(`Data saved successfully with key: ${key}`);
        } catch (error) {
            console.error(`Error saving data with key ${key}:`, error);
        }
    }

    // Function to retrieve data from local storage using key
    get(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                console.warn(`No data found for key: ${key}`);
                return null;
            }
            const value = JSON.parse(serializedValue);
            console.log(`Data retrieved successfully with key: ${key}`);
            return value;
        } catch (error) {
            console.error(`Error retrieving data with key ${key}:`, error);
            return null;
        }
    }

    // Function to save token to local storage using the generic set function
    set token(token) {
        this.set('token', token);
    }

    get token() {
        return this.get('token');
    }
}
export const storageHelper = new Storage();