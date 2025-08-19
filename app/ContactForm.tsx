'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      setMessage({ text: 'Please fill in all required fields.', type: 'error' })
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' })
      return
    }

    setIsSubmitting(true)
    setMessage({ text: '', type: '' })

    try {
      // For now, simulate form submission - you can replace this with actual form handling
      // Example: Formspree, Netlify Forms, or your own API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessage({ 
        text: 'Thank you for your message! We\'ll get back to you within 24-48 hours.', 
        type: 'success' 
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setMessage({ 
        text: 'Sorry, there was an error sending your message. Please try again.', 
        type: 'error' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
      <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Work Sans, system-ui, sans-serif', fontWeight: 700 }}>
        Send Us a Message
      </h2>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Whether you have questions about specific certifications, need guidance on career planning, or want to suggest improvements to our content, we'd love to hear from you.
      </p>

      {/* Message Display */}
      {message.text && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">Select a topic...</option>
            <option value="certification-guidance">Certification Guidance</option>
            <option value="career-advice">Career Advice</option>
            <option value="technical-support">Technical Support</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="content-feedback">Content Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
            placeholder="Tell us how we can help you..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}