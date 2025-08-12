import React, { useState } from 'react';
import { validateContactData } from '../utils/validation';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Clear submit status when user modifies form
    if (submitStatus) {
      setSubmitStatus(null);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);
    
    // Validate form data
    const validation = validateContactData(formData);
    
    if (!validation.isValid) {
      // Map validation errors to form fields
      const fieldErrors = {};
      validation.errors.forEach(error => {
        if (error.includes('Name')) fieldErrors.name = error;
        else if (error.includes('Email')) fieldErrors.email = error;
        else if (error.includes('Message')) fieldErrors.message = error;
        else fieldErrors.general = error;
      });
      
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Submit form to Vercel serverless function
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      // Form submitted successfully
      setSubmitStatus('success');
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        reason: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrors({ general: 'An error occurred while sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const reasonOptions = [
    { value: '', label: 'SELECT REASON FOR CONTACT' },
    { value: 'new-project', label: 'NEW PROJECT INQUIRY' },
    { value: 'collaboration', label: 'COLLABORATION OPPORTUNITY' },
    { value: 'press', label: 'PRESS & MEDIA' },
    { value: 'careers', label: 'CAREER OPPORTUNITIES' },
    { value: 'general', label: 'GENERAL INQUIRY' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          NAME *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={100}
          className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-colors duration-300 bg-white ${
            errors.name ? 'border-red-500 focus:border-red-500' : 'border-studio-blue/20 focus:border-studio-blue'
          }`}
          placeholder="YOUR FULL NAME"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          EMAIL *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-colors duration-300 bg-white ${
            errors.email ? 'border-red-500 focus:border-red-500' : 'border-studio-blue/20 focus:border-studio-blue'
          }`}
          placeholder="YOUR EMAIL ADDRESS"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Reason for Contact */}
      <div>
        <label 
          htmlFor="reason" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          REASON FOR CONTACT *
        </label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-colors duration-300 bg-white font-proxima font-bold text-studio tracking-studio uppercase ${
            errors.reason ? 'border-red-500 focus:border-red-500' : 'border-studio-blue/20 focus:border-studio-blue'
          }`}
          disabled={isSubmitting}
        >
          {reasonOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label 
          htmlFor="message" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          MESSAGE *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          maxLength={2000}
          className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none transition-colors duration-300 bg-white resize-vertical ${
            errors.message ? 'border-red-500 focus:border-red-500' : 'border-studio-blue/20 focus:border-studio-blue'
          }`}
          placeholder="TELL US ABOUT YOUR PROJECT OR INQUIRY..."
          disabled={isSubmitting}
        />
        <div className="mt-1 text-sm text-gray-500 text-right">
          {formData.message.length}/2000 characters
        </div>
        {errors.message && (
          <p className="mt-2 text-sm text-red-600">{errors.message}</p>
        )}
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {errors.general}
        </div>
      )}
      
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          Thank you for your message! We'll get back to you within 24 hours.
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:w-auto inline-flex items-center justify-center font-proxima font-bold text-studio text-white tracking-studio uppercase px-12 py-4 rounded-lg transition-colors duration-300 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-studio-blue hover:bg-studio-blue/80'
          }`}
          aria-label={isSubmitting ? 'Sending message...' : 'Send message to Studio Pickens'}
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
          {!isSubmitting && (
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;