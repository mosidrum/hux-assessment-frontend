import React from 'react';

const Login = () => (
  <div>
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  </div>
);

export default Login;
