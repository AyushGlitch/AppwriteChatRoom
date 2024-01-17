import React, {useState, useEffect} from 'react'
import client, { databases, DATABASE_ID, COLLECTION_ID, PROJECT_ID} from '../config/appwriteConfig'
import {ID, Query, Permission, Role} from 'appwrite'
import { Trash2 } from 'react-feather'
import Header from '../components/Header'
import { useAuth } from '../utils/AuthContext'

const Room = () => {

    const [messages, setMessages] = useState([])
    const [messageBody, setMessageBody] = useState('')
    const {user} = useAuth()
    // console.log('USER:', user)

    useEffect( () => {
        getMessages()

        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, response => {
            // Callback will be executed on changes for documents A and all files.
            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
    }, [])


    const handleSubmit = async(e) => {
        e.preventDefault()

        const permissions = [
            Permission.write(Role.user(user.$id)),
        ]

        const payload = {
            user_id:user.$id,
            username:user.name,
            body:messageBody
        }

        let response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload, permissions)
        console.log('Created ! ', response)

        // setMessages( (prevState) => {
        //     return [response, ...prevState]
        // })
        setMessageBody('')
    }


    const getMessages = async() => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, 
        [
            Query.orderDesc('$createdAt'),
            Query.limit(20)
        ])
        console.log(response)
        setMessages(response.documents)
    }


    const deleteMessage = async (messageId) => {
        const response = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, messageId)

        // setMessages( (prevState) => {
        //     return ( 
        //         messages.filter( (message) => {
        //             return (message.$id !== messageId)
        //         })
        //     )
        // })
    }


  return (
    <main className='container'>
        <Header/>
        <div className='room--container'>
            <form onSubmit={handleSubmit} id='message--form'>
                <div>
                    <textarea required 
                        maxLength='1000' 
                        placeholder='Say Something...' 
                        onChange={(e) => setMessageBody(e.target.value)} 
                        value={messageBody}></textarea>
                </div>

                <div className='send-btn--wrapper'>
                    <input type='submit' value="Send" className='btn btn--secondary'/>
                </div>
            </form>

            <div>
                {
                    messages.map( (message) => {
                        return (
                            <div key={message.$id} className='message--wrapper'>
                                <div className='message--header'>
                                    <p>
                                        {message?.username ? (
                                            <span>{message.username}</span>) : (
                                            <span>Anonymous User</span>
                                        )}
                                    
                                        <small className='message-timestamp'>
                                            {new Date(message.$createdAt).toLocaleString()}
                                        </small>
                                    </p>

                                    {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                            <Trash2 className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>)}

                                </div>
                                <div className='message--body'>
                                    <span>{message.body} </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </main>
  )
}

export default Room