import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Return the decoded token
  getProfile() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  // Check if user is logged in by verifying if a token exists and is not expired
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired by decoding it and comparing the expiration
  isTokenExpired(token: string) {
    try {
      const decoded: any = jwtDecode(token) as JwtPayload;
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Set the token to localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('jwt', idToken);
    window.location.assign('/'); // Redirect to home or Kanban board
  }

  // Remove the token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('jwt');
    window.location.assign('/login');
  }
}

export default new AuthService();
