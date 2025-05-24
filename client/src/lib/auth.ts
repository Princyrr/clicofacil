export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

const AUTH_KEY = 'currentUser';

export function saveCurrentUser(user: AuthUser): void {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

export function getCurrentUser(): AuthUser | null {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export function logout(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

// Simular banco de usuários para demonstração
const USERS_KEY = 'registeredUsers';

export function saveUser(user: { name: string; email: string; password: string }): AuthUser {
  try {
    const users = getUsers();
    const newUser: AuthUser = {
      id: Date.now(),
      name: user.name,
      email: user.email,
    };
    
    const userWithPassword = { ...newUser, password: user.password };
    users.push(userWithPassword);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return newUser;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

export function validateLogin(email: string, password: string): AuthUser | null {
  try {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
    return null;
  } catch (error) {
    console.error('Error validating login:', error);
    return null;
  }
}

function getUsers(): Array<AuthUser & { password: string }> {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}