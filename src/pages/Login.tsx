import { useRef, useState } from 'react';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<any>(null);

  async function handleLogin() {
    console.log(emailRef.current?.value, passwordRef.current?.value);

    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
    const json = await res.json();
    setMessage(json);
  }

  // Not the right way to do form, just for demo purpose
  return (
    <div>
      {JSON.stringify(message)}
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
