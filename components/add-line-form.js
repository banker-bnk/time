//TODO: to be deleted (only reference)
'use client';

import { useState } from 'react';

export default function AddLineForm({ onLineAdded }) {
    const [identifier, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('/api/lines', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: identifier }),
        });

        setName('');
        if (onLineAdded) onLineAdded();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Create a new line</p>
                <label htmlFor="name"></label>
                <input className='text-black'
                    type="text"
                    id="name"
                    name="name"
                    value={identifier}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
