import React from 'react'
import { useState, useEffect } from 'react';

export default function ChatBubble(props) {
    const { username , message } = props;
    return (
        <div className='bubble'>
            <div className='user'>
                {username}
            </div>
            <div className='theMessage'>
                {message}
            </div>
        </div>
    )
}