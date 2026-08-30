import { useState } from 'react';
import { personalInfo } from '../../constants/index.js';
import { IconExternal, IconSend } from '../../components/ide/icons.jsx';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const hasEmailJs = Boolean(serviceId && templateId && publicKey);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const mailto = ({ name, email, message }) =>
    `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Portfolio — ${name || 'hello'}`)}` +
    `&body=${encodeURIComponent(`${message || ''}\n\n— ${name || ''} (${email || ''})`)}`;

const DETAILS = [
    { k: 'email', v: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { k: 'location', v: personalInfo.location },
    { k: 'github', v: '/Prahlad-07', href: personalInfo.socialLinks.github },
    { k: 'linkedin', v: '/prahlad-yadav-07', href: personalInfo.socialLinks.linkedin },
    { k: 'resume', v: 'open latest', href: personalInfo.resumeUrl },
];

const ContactPreview = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setStatus(null);
        const f = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
        if (!f.name || !f.email || !f.message) return setStatus({ ok: false, msg: 'all fields are required.' });
        if (!isEmail(f.email)) return setStatus({ ok: false, msg: 'that email looks off.' });
        if (f.message.length < 10) return setStatus({ ok: false, msg: 'message needs at least 10 characters.' });
        if (!hasEmailJs) return setStatus({ ok: false, msg: 'form service not configured — use "email app" below.' });

        setLoading(true);
        try {
            const { default: emailjs } = await import('@emailjs/browser');
            const res = await emailjs.send(
                serviceId,
                templateId,
                { from_name: f.name, name: f.name, from_email: f.email, reply_to: f.email, email: f.email, message: f.message, to_name: 'Prahlad' },
                publicKey,
            );
            if (res?.status !== 200) throw new Error('bad status');
            setStatus({ ok: true, msg: 'sent. talk soon.' });
            setForm({ name: '', email: '', message: '' });
        } catch {
            setStatus({ ok: false, msg: 'could not send — use "email app" below.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pv pv-contact">
            <p className="pv_run">$ node contact.ts</p>

            <div className="contact_grid">
                <dl className="contact_details">
                    {DETAILS.map((d) => (
                        <div key={d.k}>
                            <dt>{d.k}</dt>
                            <dd>
                                {d.href ? (
                                    <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                                        {d.v}
                                    </a>
                                ) : (
                                    d.v
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>

                <form className="contact_form" onSubmit={submit}>
                    <label>
                        <span>name</span>
                        <input name="name" value={form.name} onChange={set} placeholder="your name" required />
                    </label>
                    <label>
                        <span>email</span>
                        <input name="email" type="email" value={form.email} onChange={set} placeholder="you@email.com" required />
                    </label>
                    <label>
                        <span>message</span>
                        <textarea name="message" value={form.message} onChange={set} placeholder="role, project, or just to say hi…" required />
                    </label>

                    {status && (
                        <p className={`contact_status ${status.ok ? 'ok' : 'err'}`}>
                            {status.ok ? '✓ ' : '✗ '}
                            {status.msg}
                        </p>
                    )}

                    <div className="pv_actions">
                        <button type="submit" className="btn" disabled={loading}>
                            <IconSend /> {loading ? 'sending…' : 'send message'}
                        </button>
                        <a className="btn btn--ghost" href={mailto(form)}>
                            <IconExternal /> email app
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPreview;
