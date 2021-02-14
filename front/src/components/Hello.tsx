import { useState, useEffect } from 'react';

type HeaderProps = { message: string };

const Hello = ({ message }: HeaderProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (

        <div className="container">
            <h1 className="title">
                {message}
            </h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
        </div>
    );
}


export default Hello;