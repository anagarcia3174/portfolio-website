import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

/* "Thu Sep 17  9:41 PM" — the menu-bar clock format from the design. */
export function formatClock(d) {
  const day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', '');
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${day}  ${time}`;
}

export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function useViewport() {
  const read = () => ({ w: window.innerWidth, h: window.innerHeight });
  const [vp, setVp] = useState(read);
  useEffect(() => {
    const onResize = () => setVp(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vp;
}

/* Contact form wired to EmailJS (same env vars and field names as before). */
export function useContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      formRef.current.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const statusLabel = { idle: 'CONNECTED', sending: 'SENDING…', sent: 'MESSAGE SENT', error: 'SEND FAILED' }[status];

  return { formRef, status, statusLabel, onSubmit, reset: () => setStatus('idle') };
}
