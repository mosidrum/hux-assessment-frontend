import React from 'react';

const SignUp = () => (
  <form>
    <div>
      <label htmlFor="name">Name</label>
      <input type="name" name="name" id="name" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
    </div>
    <button type="submit" className="btn btn-primary">Sign Up</button>
  </form>
);

export default SignUp;
