import React from 'react';
import '../styles/App.css';

function Header() {
    return (
        <header>
            <div className="header_text">
                <h1 className="header_title">WikiLink</h1>
                <h2 className="header_desc">Paste in any URL to "wikify" it</h2>
            </div>
        </header>
    )
}

export default Header;