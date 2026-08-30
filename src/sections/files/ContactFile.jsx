import { useState } from 'react';
import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightCode } from '../../components/ide/highlight.js';
import { IconExternal, IconPlay, IconSend } from '../../components/ide/icons.jsx';
import { personalInfo } from '../../constants/index.js';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const hasEmailJs = Boolean(serviceId && templateId && publicKey);

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const SRC = `// contact.ts
export const contact = {
  email:    "${personalInfo.email}",
  location: "${personalInfo.location}",
  linkedin: "linkedin.com/in/prahlad-yadav-07",
  github:   "github.com/Prahlad-07",
  status:   "open to full-time SDE roles",
};

export async function sendMessage(msg: Message): Promise<Result> {
  // the form below is wired to EmailJS — try it
}`;

const mailtoLink = ({ name, email, message }) =>
    `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Portfolio contact: ${name || 'visitor'}`)}` +
    `&body=${encodeURIComponent(`${message || ''}\n\n— ${name || ''} (${email || ''})`)}`;

const ContactFile = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setStatus(null);
        const f = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
        if (!f.name || !f.email || !f.message) return setStatus({ ok: false, msg: 'All fields are required.' });
        if (!isEmail(f.email)) return setStatus({ ok: false, msg: 'Enter a valid email address.' });
        if (f.message.length < 10) return setStatus({ ok: false, msg: 'Message must be at least 10 characters.' });
        if (!hasEmailJs) return setStatus({ ok: false, msg: 'Form service not configured — use "Email app" below.' });

        setLoading(true);
        try {
            const { default: emailjs } = await import('@emailjs/browser');
            const res = await emailjs.send(
                serviceId,
                templateId,
                { from_name: f.name, name: f.name, from_email: f.email, reply_to: f.email, email: f.email, message: f.message, to_name: 'Prahlad' },
                publicKey,
            );
            if (res?.status === 200) {
                setStatus({ ok: true, msg: 'Message sent — thanks, I\'ll reply soon.' });
                setForm({ name: '', email: '', message: '' });
            } else {
                throw new Error('bad status');
            }
        } catch {
            setStatus({ ok: false, msg: 'Could not send from the form — use "Email app" below.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <FileShell id="contact">
            <CodeBlock lines={highlightCode(SRC)} />

            <div className="preview">
                <div className="preview_bar">
                    <IconPlay />
                    <span>Run — sendMessage()</span>
                </div>
                <div className="preview_body">
                    <div className="contact">
                        <div>
                            <dl className="contact_meta">
                                <div className="contact_metaRow">
                                    <dt>email</dt>
                                    <dd><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></dd>
                                </div>
                                <div className="contact_metaRow">
                                    <dt>location</dt>
                                    <dd>{personalInfo.location}</dd>
                                </div>
                                <div className="contact_metaRow">
                                    <dt>linkedin</dt>
                                    <dd><a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">/prahlad-yadav-07</a></dd>
                                </div>
                                <div className="contact_metaRow">
                                    <dt>github</dt>
                                    <dd><a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">/Prahlad-07</a></dd>
                                </div>
                                <div className="contact_metaRow">
                                    <dt>resume</dt>
                                    <dd><a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">open latest</a></dd>
                                </div>
                            </dl>
                        </div>

                        <form className="contact_form" onSubmit={submit}>
                            <div className="field">
                                <label htmlFor="c-name">name</label>
                                <input id="c-name" name="name" value={form.name} onChange={update} placeholder="Your name" required />
                            </div>
                            <div className="field">
                                <label htmlFor="c-email">email</label>
                                <input id="c-email" name="email" type="email" value={form.email} onChange={update} placeholder="you@email.com" required />
                            </div>
                            <div className="field">
                                <label htmlFor="c-msg">message</label>
                                <textarea id="c-msg" name="message" value={form.message} onChange={update} placeholder="Role, project, or just to say hi…" required />
                            </div>

                            {status && (
                                <p className={`form-status ${status.ok ? 'ok' : 'err'}`}>
                                    {status.ok ? '✓ ' : '✗ '}
                                    {status.msg}
                                </p>
                            )}

                            <div className="contact_actions">
                                <button type="submit" className="vs-btn" disabled={loading}>
                                    <IconSend /> {loading ? 'Sending…' : 'Send message'}
                                </button>
                                <a className="vs-btn vs-btn--secondary" href={mailtoLink(form)}>
                                    <IconExternal /> Email app
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </FileShell>
    );
};

export default ContactFile;
