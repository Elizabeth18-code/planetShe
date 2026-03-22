// Ícones separados por nome para evitar JSX inline nos dados
function ServiceIcon({ name }) {
  const icons = {
    studies: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h4v1H8v-1z" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </svg>
    ),
    tools: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M20 6h-2.18c.07-.44.18-.86.18-1.3C18 2.13 15.87 0 13.3 0c-1.3 0-2.4.52-3.23 1.36L9 2.35 7.93 1.36A4.54 4.54 0 004.7 0C2.13 0 0 2.13 0 4.7c0 .44.11.86.18 1.3H0v2h20V6zm-9.4 0H4.33c-.1-.42-.13-.85-.03-1.3C4.57 2.88 5.6 2 6.7 2c.9 0 1.62.37 2.15.97L9.96 4.1l-.97.98L8.1 4.19A1.54 1.54 0 006.7 3.5c-.63 0-1.2.49-1.2 1.2 0 .45.23.86.59 1.1l.21.2H10.6zM22 10H2v12h20V10z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

export default ServiceIcon;
