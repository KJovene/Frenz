import React from 'react'

function Footer() {
    return (
        <div className="footer p-10 bg-base-200 text-base-content">
            <div>
                <span className="footer-title">© {new Date().getFullYear()} Frenz</span>
            </div>
        </div>
    )
}

export default Footer