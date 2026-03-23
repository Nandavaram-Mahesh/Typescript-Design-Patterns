// Abstract Products
interface MessageSender {
  send(to: string, message: string): void;
}

interface MessageFormatter {
  format(content: string): string;
}

// Concrete Products

// Product 1
class EmailSender implements MessageSender{
    send(to: string, message: string): void{
       console.log(`Sending EMAIL to ${to}: ${message}`);  
    }
}

class EmailFormatter implements MessageFormatter{
     format(content: string): string{
         return `<html><body>${content}</body></html>`;
     }
}

// Product 2

class SMSSender implements MessageSender{
    send(to: string, message: string): void{
      console.log(`Sending SMS to ${to}: ${message}`);  
    }
}

class SMSFormatter implements MessageFormatter{
     format(content: string): string{
        return content.substring(0, 160); // SMS limit
     }
}



// Abstract Factory

interface NotificationFactory {
  createSender(): MessageSender;
  createFormatter(): MessageFormatter;
}


class EmailFactory implements NotificationFactory{
    createSender(): MessageSender{
        return new EmailSender()
    }
    
    createFormatter(): MessageFormatter{
      return new EmailFormatter()
    }
}

class SMSFactory implements NotificationFactory{
    createSender(): MessageSender{
        return new SMSSender()
    }
    
    createFormatter(): MessageFormatter{
      return new SMSFormatter()
    } 
}



function sendNotification(factory: NotificationFactory, to: string, content: string) {
  const formatter = factory.createFormatter();
  const sender = factory.createSender();

  const formattedMessage = formatter.format(content);
  sender.send(to, formattedMessage);
}

// Client Code
sendNotification(new EmailFactory(), "mahesh@gmail.com", "Welcome!");
sendNotification(new SMSFactory(), "+919686428705", "Welcome!");