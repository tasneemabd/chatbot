import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: ""
});
const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const mainRef = useRef(null);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an EbereGPT. You can help with graphic design tasks",
          },
          ...chats,
        ],
      })
      .then((res) => {
        msgs.push(res.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    mainRef.current.scrollTo(0, mainRef.current.scrollHeight);
  }, [chats]);

  return (
  
<>
<nav className="navbar">
        <div className="navbar-container container1">
            <input type="checkbox" name="" id=""/>
            <div className="hamburger-lines">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
            </div>
           
            <h1 className="logo">ChatGPT</h1>
        </div>
    </nav>
    <hr/>



    <main ref={mainRef} className="chat-container">
      <section className="chat ci">
        {chats && chats.length
          ? chats.map((chat, index) => (
            <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>
                    {chat.role.toUpperCase() === "USER" ? (
                      <img
                      src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                      alt="User"
                      className="avatar"
                      />
                      ) : chat.role.toUpperCase() === "ASSISTANT" ? (
                        <img
                        src="https://image.shutterstock.com/image-illustration/3d-rendering-cute-artificial-intelligence-260nw-1844845042.jpg"
                        alt="Assistant"
                        className="avatar"
                        />
                        ) : (
                          chat.role.toUpperCase()
                          )}
                  </b>
                </span>
                <span></span>
                <span>{chat.content}</span>
              </p>
            ))
            : ""}
            <div className={isTyping ? "typing_loader" : "hide"}>
        {/* <p>
          <i>{isTyping ? "Typing..." : ""}</i>
        </p> */}
      </div>
      <form action="" onSubmit={(e) => chat(e, message)}>
        
        <div className="chat-box">
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here and hit Enter..."
            onChange={(e) => setMessage(e.target.value)}
            />
          <button>
            <svg width="20" height="30" viewBox="0 0 30 21">
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
            </svg>
          </button>
        </div>
      </form>
      </section>


      
    </main>
    
            </>
          
  )}
export default App;
