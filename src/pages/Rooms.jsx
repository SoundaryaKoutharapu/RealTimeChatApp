import { useState, useEffect } from "react"
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from "../appWriteConfig"
import { ID, Query } from "appwrite"
import { Trash2 } from "react-feather"

const Rooms = () => {

  const [messages, setMessages] = useState([])
  const [messageBody, setMessageBody] = useState('')

  useEffect(() => {
    getMessages()

    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      // Callback will be executed on changes for documents A and all files.

      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        console.log('A message was created');
        setMessages(prevState => [response.payload, ...prevState])

      }

      if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
        console.log('A message was deleted');
        setMessages(prevState => messages.filter(message => message.$id != response.payload.$id))
      }

    });

          return () =>
          {
            unsubscribe();
          } 
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload = {
      body: messageBody
    }

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    )

    console.log('Created!', response);

    // setMessages(prevState => [response, ...prevState])

    setMessageBody('')
  }

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(5)
      ]
    )
    console.log('RESPONSE:', response);
    setMessages(response.documents)
  }

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id)
    // setMessages(prevState => messages.filter(message => message.$id != message_id))


  }

  return (
    <main className="container">
      <div className="room--container">

        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              maxLength='1000'
              required
              placeholder="say something.."
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}>
            </textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value='send' />
          </div>
        </form>

        <div>
          {messages.map(message => (
            <div key={message.$id} className="message--wrapper">
              <div className="messages--header">
                <Trash2
                  className="delete--btn"
                  onClick={() => { deleteMessage(message.$id) }} > </Trash2>
                <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>


      </div>
    </main>
  )
}
export default Rooms