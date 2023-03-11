import React from 'react'
import { useState, useEffect } from 'react';

export default function ChatBubble(props) {
    const { username , message } = props;
    return (
        <div className='bubble'>
            {message} createdBy: {username}
        </div>
    )
}