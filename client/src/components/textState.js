import React, { useEffect, useState } from 'react';

function RevealText({ text, maxLength }) {
    const [hidden, setHidden] = useState(true);
    if (text.length <= maxLength) {
        return <span>{text} </span>
    }

    return (
        <span>
            {hidden ? text.substr(0, maxLength) : text + `\n`}
            {hidden ? (
                <a onClick={() => setHidden(false)}> Read more </a>
            ) : (
                    <a onClick={() => setHidden(true)}>Read Less</a>
                )}
        </span>
    )
}

export default RevealText;