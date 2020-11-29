import React, { createContext, useCallback, useState, useContext } from 'react';

interface ChatContextData {
  chatId: string;
  saveChatId: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

const ChatIdProvider: React.FC = ({ children }) => {
  const [chatId, setChatId] = useState<string>(() => {
    const chatIdStoraged = localStorage.getItem('@smia:chatId');

    if (chatIdStoraged) {
      return chatIdStoraged;
    }

    return '';
  });

  const saveChatId = useCallback((chat_id: string) => {
    localStorage.setItem('@smia:chatId', chat_id);
    setChatId(chat_id);
  }, []);

  return (
    <ChatContext.Provider value={{ chatId, saveChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = (): ChatContextData => {
  const context = useContext(ChatContext);

  return context;
};

export { ChatIdProvider, useChatContext };
