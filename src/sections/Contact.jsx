import {useState} from 'react'
import emailjs from '@emailjs/browser'
import { personalInfo } from "../constants/index.js";

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_n3ls4ma';
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_qkkm3dp';
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'iHlw_s43l1viJQ9wu';

const createMailtoLink = ({ name, email, message }) => {
    const subject = encodeURIComponent(`Portfolio Contact: ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
        `Hi Prahlad,\n\n${message || 'I would like to connect with you.'}\n\nName: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}`
    );
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
};

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = ({target: {name, value}}) => {
        setForm({...form, [name]: value});
    };

    const handleSendViaMailClient = () => {
        window.location.href = createMailtoLink(form);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        setLoading(true);

        try{
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
                message: ''
            });
        }catch(error){
            console.error('EmailJS send failed:', error);
            setStatus({
                type: 'error',
                message: 'Message could not be sent from the form right now. Please use "Send via Email App" below.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="c-space my-24 section-wrap" id="contact">
            <p className="section-kicker">
                Let&apos;s Build Something Great
            </p>
            <p className="head-text">
                Contact Me
            </p>

            <div className="contact-grid mt-10">
                <aside className="contact-info-card">
                    <p className="contact-info-title">
                        Open to hiring and collaboration
                    </p>
                    <p className="contact-info-text">
                        Whether you are a recruiter looking to hire, or a developer looking to collaborate, I am always happy to chat.
                    </p>
                    <div className="contact-info-stack">
                        <div className="contact-info-row">
                            <span>Email</span>
                            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                        </div>
                        <div className="contact-info-row">
                            <span>Location</span>
                            <p>{personalInfo.location}</p>
                        </div>
                    </div>
                    <a
                        href={personalInfo.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-resume-link"
                    >
                        View Resume
                    </a>
                </aside>

                <div className="contact-container relative overflow-hidden">
                    <img
                        src="/assets/terminal.png"
                        alt="terminal background"
                        className="contact-terminal-bg"
                    />

                    <form onSubmit={handleSubmit} className="contact-form">
                        <label className="space-y-3">
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
                        <label className="space-y-3">
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
                        <label className="space-y-3">
                            <span className="field-label">Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="field-input resize-none"
                                placeholder="Share your requirement, role details, or collaboration idea..."
                            />
                        </label>

                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                        </button>
                    </form>

                    {status && (
                        <p className={`contact-status ${status.type === 'success' ? 'contact-status_success' : 'contact-status_error'}`}>
                            {status.message}
                        </p>
                    )}

                    <button type="button" className="field-btn field-btn_secondary mt-4" onClick={handleSendViaMailClient}>
                        Send via Email App
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Contact
