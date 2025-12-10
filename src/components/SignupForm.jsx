// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { signupUser } from '../services/authService';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    message: '',
    isError: false
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ message: '', isError: false }); // Reset feedback

    const { email, password, username } = form;

    if (!email || !password || !username) {
        setLoading(false);
        setFeedback({ message: "Please fill in all fields.", isError: true });
        return;
    }
    
    const result = await signupUser(email, password, username);
    setLoading(false);

    if (result.success) {
      setFeedback({ 
        message: `Success! User ${result.user.email} created and profile saved to Firestore.`,
        isError: false
      });
      // Optionally reset form fields here
      setForm({ email: '', password: '', username: '' });
    } else {
      setFeedback({ 
        message: result.error || 'Sign up failed.',
        isError: true
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Username Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Feedback Message */}
        {feedback.message && (
          <p style={{ color: feedback.isError ? 'red' : 'green', fontWeight: 'bold' }}>
            {feedback.message}
          </p>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 15px', backgroundColor: loading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;