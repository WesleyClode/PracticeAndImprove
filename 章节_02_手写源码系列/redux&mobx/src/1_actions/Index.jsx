import React, { useEffect } from 'react';
import actions from './action';

export default function Index() {
    useEffect(() => {
        actions.on('send_data', (data) => {
            console.log('the data is sending....', data);
        })
    });

    const handleClick = () => {
        actions.emit('send_data', 'btn clicked');
    }
  return (
    <div>
        <button onClick={handleClick}>send</button>
    </div>
  )
}
