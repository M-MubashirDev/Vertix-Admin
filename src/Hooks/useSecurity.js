/**
 * Generate a random unique key
 * @returns {string} - A unique key (UUID or timestamp-based)
 */
const generateRandomKey = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Set authentication data in localStorage with a unique key
 * @param {Object} data - The data to store
 * @param {string} data.token - The auth token
 * @param {Object} data.user - The user details
 */
export const setAuthData = ({ token, user }) => {
  const randomKey = generateRandomKey(); // Generate a unique key
  localStorage.setItem("storageKey", randomKey); // Save the random key in a known location
  localStorage.setItem(
    randomKey,
    JSON.stringify({ token, user }) // Save the token and user data under the unique key
  );
};

/**
 * Get authentication data using the random key
 * @returns {Object|null} - The stored auth token and user data, or null if not found
 */
export const getAuthData = () => {
  const randomKey = localStorage.getItem("storageKey"); // Retrieve the random key
  if (!randomKey) return null; // If no key, return null

  const storedData = JSON.parse(localStorage.getItem(randomKey));
  return storedData || null;
};

/**
 * Clear authentication data from localStorage
 */
export const clearAuthData = () => {
  const randomKey = localStorage.getItem("storageKey"); // Retrieve the random key
  if (randomKey) {
    localStorage.removeItem(randomKey); // Remove the data associated with the key
    localStorage.removeItem("storageKey"); // Remove the random key itself
  }
};

/**
 * Check if the user is authenticated
 * @returns {boolean} - True if token exists, false otherwise
 */
export const isAuthenticated = () => {
  const authData = getAuthData();
  return !!authData?.token; // Return true if the token exists
};
