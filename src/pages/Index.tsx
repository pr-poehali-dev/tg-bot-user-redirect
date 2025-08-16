import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Добро пожаловать! Я бот для быстрого доступа к профилю @sh0vrin',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      type: 'bot',
      text: '📋 Доступные команды:\n/profile - перейти к профилю @sh0vrin\n/start - показать это сообщение',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (command?: string) => {
    const messageText = command || inputValue;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (messageText === '/profile') {
        botResponse = '👤 Переходим к профилю @sh0vrin...\n\n🔗 https://t.me/sh0vrin';
        // Simulate opening profile
        setTimeout(() => {
          window.open('https://t.me/sh0vrin', '_blank');
        }, 1000);
      } else if (messageText === '/start') {
        botResponse = '👋 Добро пожаловать! Я бот для быстрого доступа к профилю @sh0vrin\n\n📋 Доступные команды:\n/profile - перейти к профилю @sh0vrin\n/start - показать это сообщение';
      } else {
        botResponse = '❓ Неизвестная команда. Попробуйте:\n/profile - перейти к профилю @sh0vrin\n/start - показать справку';
      }

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-telegram-bg to-telegram-chat flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={20} />
          </div>
          <div>
            <h1 className="font-semibold">Profile Bot</h1>
            <p className="text-sm opacity-90">онлайн</p>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-telegram-message h-96 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md'
                } animate-fade-in`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Commands */}
        <div className="bg-telegram-message px-4 py-2 flex gap-2">
          <Button
            onClick={() => handleSendMessage('/profile')}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <Icon name="User" size={16} className="mr-2" />
            /profile
          </Button>
          <Button
            onClick={() => handleSendMessage('/start')}
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
            /start
          </Button>
        </div>

        {/* Input */}
        <div className="bg-telegram-message p-4 rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Введите команду..."
            className="flex-1 bg-white/10 text-white placeholder:text-white/50 px-4 py-2 rounded-full border border-white/20 focus:outline-none focus:border-primary"
          />
          <Button
            onClick={() => handleSendMessage()}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-white">
              <Icon name="Info" size={20} />
              <h3 className="font-semibold">О боте</h3>
            </div>
          </CardHeader>
          <CardContent className="text-white/80 text-sm">
            <p>Этот бот создан для быстрого доступа к профилю пользователя @sh0vrin в Telegram.</p>
            <div className="mt-3 flex items-center gap-2">
              <Icon name="Zap" size={16} />
              <span>Современный интерфейс</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Icon name="Shield" size={16} />
              <span>Безопасные переходы</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;