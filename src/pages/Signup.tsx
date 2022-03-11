import { useRef, useState } from 'react';

export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<any>(null);

  async function handleSignup() {
    console.log(emailRef.current?.value, passwordRef.current?.value);

    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
    const json = await res.json();
    console.log(json);
    setMessage(json);
  }

  // Not the right way to do form, just for demo purpose
  return (
    <div>
      <h1>Create a new user</h1>
      {JSON.stringify(message)}
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
