import { useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { personalInfo } from '../constants/index.js';

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const hasEmailJsConfig = Boolean(emailServiceId && emailTemplateId && emailPublicKey);

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const createMailtoLink = ({ name, email, message }) => {
    const subject = encodeURIComponent(`Portfolio Contact: ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
        `Hi Prahlad,\n\n${message || 'I would like to connect with you.'}\n\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
};

const profileLinks = [
    { id: 1, label: 'LinkedIn', href: personalInfo.socialLinks.linkedin },
    { id: 2, label: 'GitHub', href: personalInfo.socialLinks.github },
    { id: 3, label: 'Instagram', href: personalInfo.socialLinks.instagram },
];

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSendViaMailClient = () => {
        window.location.href = createMailtoLink(form);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus(null);

        const trimmedForm = {
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
        };

        if (!trimmedForm.name || !trimmedForm.email || !trimmedForm.message) {
            setStatus({
                type: 'error',
                message: 'Please fill all fields before sending.',
            });
            return;
        }

        if (!validateEmail(trimmedForm.email)) {
            setStatus({
                type: 'error',
                message: 'Please enter a valid email address.',
            });
            return;
        }

        if (trimmedForm.message.length < 10) {
            setStatus({
                type: 'error',
                message: 'Please write a message with at least 10 characters.',
            });
            return;
        }

        if (!hasEmailJsConfig) {
            setStatus({
                type: 'error',
                message: 'Form email service is not configured right now. Please use "Use Email App".',
            });
            return;
        }

        setLoading(true);

        try {
            const { default: emailjs } = await import('@emailjs/browser');

            const templateParams = {
                from_name: trimmedForm.name,
                name: trimmedForm.name,
                to_name: 'Prahlad',
                from_email: trimmedForm.email,
                email: trimmedForm.email,
                reply_to: trimmedForm.email,
                to_email: personalInfo.email,
                message: trimmedForm.message,
                subject: `Portfolio Contact: ${trimmedForm.name}`,
            };

            const response = await emailjs.send(
                emailServiceId,
                emailTemplateId,
                templateParams,
                emailPublicKey
            );

            if (response?.status === 200) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully. Thank you for reaching out.',
                });
            } else {
                throw new Error(`Unexpected EmailJS response status: ${response?.status}`);
            }

            setForm({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error('EmailJS send failed:', error);
            setStatus({
                type: 'error',
                message: 'Message could not be sent from the form right now. Please use "Use Email App".',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-wrap" id="contact">
            <div className="shell">
                <SectionHeader
                    eyebrow="Contact"
                    title="Let&apos;s build something meaningful together."
                    description="If you are hiring for a software engineering role, want to discuss a project, or just want to connect, I&apos;d be happy to hear from you."
                />

                <div className="contact-layout">
                    <aside className="premium-card contact-info_card">
                        <span className="card-label">Open to hiring and collaboration</span>
                        <h3>Backend-focused, product-aware, and ready for high-impact work.</h3>
                        <p>
                            I&apos;m open to full-time software engineering roles, internships, and strong product engineering opportunities where ownership and execution quality matter.
                        </p>

                        <div className="contact-detail_stack">
                            <a href={`mailto:${personalInfo.email}`} className="contact-detail_card">
                                <span>Email</span>
                                <strong>{personalInfo.email}</strong>
                            </a>
                            <div className="contact-detail_card">
                                <span>Location</span>
                                <strong>{personalInfo.location}</strong>
                            </div>
                            <a
                                href={personalInfo.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-detail_card"
                            >
                                <span>Resume</span>
                                <strong>Open latest version</strong>
                            </a>
                        </div>

                        <div className="contact-social_row" aria-label="Social profiles">
                            {profileLinks.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-link_chip"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </aside>

                    <article className="premium-card contact-form_card">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <label className="field-group">
                                <span className="field-label">Full Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="field-input"
                                    placeholder="Your full name"
                                />
                            </label>

                            <label className="field-group">
                                <span className="field-label">Email</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="field-input"
                                    placeholder="your@email.com"
                                />
                            </label>

                            <label className="field-group">
                                <span className="field-label">Message</span>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="field-input field-input_textarea"
                                    placeholder="Share the role, project, or collaboration idea..."
                                />
                            </label>

                            {status && (
                                <p
                                    className={`status-banner ${
                                        status.type === 'success'
                                            ? 'status-banner_success'
                                            : 'status-banner_error'
                                    }`}
                                >
                                    {status.message}
                                </p>
                            )}

                            <div className="contact-actions">
                                <button className="button-primary" type="submit" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                                <button type="button" className="button-ghost" onClick={handleSendViaMailClient}>
                                    Use Email App
                                </button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Contact;
