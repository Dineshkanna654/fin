import ChatPage from "./pages/chat/chat";
import SideMenu from "./components/sidemenu";
import Header from "./components/header/header";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <div className="side-menu">
        <SideMenu />
      </div>
      <div className="rigth-side">
        <div className="chat-head">
          <Header />
        </div>
        <div className="ChatPage">
          <ChatPage />
        </div>
      </div>
    </div>
  );
};

export default App;
