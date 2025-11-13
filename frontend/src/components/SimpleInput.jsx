import React from 'react';

export function SimpleInput({ label, type = 'text', value, onChange, options = [], className = '' }) {
  return (
    <div>
      {label && <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>{label}</label>}

      {type === 'textarea' ? (
        <textarea className={className}
                     value={value}
                     onChange={(e) => {e.target.style.height = 'auto'; 
                     e.target.style.height = `${e.target.scrollHeight}px`; // Set new height 
                     onChange(e.target.value);

 }}

         style={{
         width: '100%',
         height: 'auto',          
         overflow: 'hidden',
         resize: 'none',
         padding: '10px',
         borderRadius: '10px',
         border: '1px solid #ccc',
         fontSize: '14px',
         fontFamily: 'inherit',
         lineHeight: '1',
         boxSizing: 'border-box'
  }}
/>

      ) : type === 'select' ? (
        <select
          className={className}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '90%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={className}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        />
      )}
    </div>

    
  );
}
