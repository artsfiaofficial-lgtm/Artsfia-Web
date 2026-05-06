import React from 'react'

export default function VideoAndTextBox() {
    return (
        <div className='videoAndTextBoxDiv'>
            <div className="animatedTextBox">
                <p>ARTSFIA'S</p>
                <div className="animatedTextShowOverlay">
                    <p>TRADITIONAL</p>
                    <p>FASHIONABLE</p>
                    <p>ETHNIC</p>
                </div>
                <p>COLLECTION!</p>
            </div>
            <div className="videoBoxHome">
                <video
                    src='/assets/video/artsfia video.mp4'
                    autoPlay
                    muted
                    loop
                    playsInline
                ></video>
            </div>
        </div>
    )
}
