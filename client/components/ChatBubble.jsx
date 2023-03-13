import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

export default function ChatBubble(props) {
    const { username , message, id } = props;
    const [bgColor, setBgColor] = useState('#D880B6');

    useEffect(() => {
      if (id === username) {
          setBgColor('#80ABD8');
      }
    }, [username]);

    return (
        <motion.div 
            animate={{x: 100, scale: 1}} 
            initial={{scale:0}}
            transition={{type: "tween", duration:0.5}}
        >
            <div 
                className='bubble'
                style={{
                    backgroundColor: bgColor,
                    borderRadius: '20px',
                    padding: '10px',
                    maxWidth: '80%',
                    margin: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
                }}
            >
                <div 
                    className='user'
                    style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#444',
                    }}
                >
                    {username}
                </div>
                <div 
                    className='theMessage'
                    style={{
                        fontSize: '16px',
                        fontStyle: 'italic',
                        color: '#555',
                        marginTop: '5px',
                    }}
                >
                    {message}
                </div>
            </div>
        </motion.div>

    )
}
