import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import Toast from './Toast';
import Message from './Message';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState('');
    const [showToast, setShowToast] = useState(false);

    const user1 = 'alert alert-primary ml-auto';
    const user2 = 'alert alert-warning mr-auto';

    useEffect(() => {
        

        socket.on('new-message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('typing', (username) => {
            setTyping(`${username} is typing...`);
            setTimeout(() => {
                setTyping('');
            }, 2000)
        });

        socket.on('username', (username) => {

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000)
           
        });

        socket.on('messages', (messages) => {
            setMessages(messages);
        })

        return() => {
            socket.off('new-message');
            socket.off('typing');
        }
    },[]);

    useEffect(() => {
      socket.emit('get-messages');

      
    }, [messages])
    

    const handleMessage = () => {
        socket.emit('new-message', { username, message });
        setMessage('');
    };

    const handleTyping = () => {
        socket.emit('typing', username);
    };

    const handleSetUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleJoinChat = () => {
        socket.emit('set-username', username);
    }

    const handleWriteMessage = (e) => {
        setMessage(e.target.value);
    }

    const showMessages = () => {
        
        return messages.map((message, index) => (
            <Message key={index} msg={message} color={message.username === username ? user1 : user2}/>
        ))
    }
 


  return (
    <div className='container d-flex flex-column justify-content-between h-75'>
      <div className='d-flex justify-content-center'>
          
        <input
            type="text"
            placeholder='Username'
            className='form-control '
            value={ username }
            onChange={  handleSetUsername }
        />

        <button onClick={ handleJoinChat } className='btn btn-outline-success form-control w-50'>Join Chat</button>
      </div>

        <div id='chat m-auto '>
            <div id='messages' className='d-flex flex-column justify-content-end align-items-end w-100'>
                { showMessages() }
            </div>

            <div id='typing'>{ typing }</div>

            <div className='d-flex'>
                <input
                    type="text"
                    className='form-control '
                    placeholder='Write a message...'
                    value={ message }
                    onChange={ handleWriteMessage }
                    onInput={ handleTyping }
                    />

                <button onClick={ handleMessage } className='btn btn-primary w-50 form-control'>Send</button>
            </div>
        </div>
        {
            showToast && <Toast user={username} />
        }

    </div>
  )
}

export default Chat
