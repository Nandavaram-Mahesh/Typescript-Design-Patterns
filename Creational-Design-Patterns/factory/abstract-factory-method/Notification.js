"use strict";
// Concrete Products
// Product 1
class EmailSender {
    send(to, message) {
        console.log(`Sending EMAIL to ${to}: ${message}`);
    }
}
class EmailFormatter {
    format(content) {
        return `<html><body>${content}</body></html>`;
    }
}
// Product 2
class SMSSender {
    send(to, message) {
        console.log(`Sending SMS to ${to}: ${message}`);
    }
}
class SMSFormatter {
    format(content) {
        return content.substring(0, 160); // SMS limit
    }
}
class EmailFactory {
    createSender() {
        return new EmailSender();
    }
    createFormatter() {
        return new EmailFormatter();
    }
}
class SMSFactory {
    createSender() {
        return new SMSSender();
    }
    createFormatter() {
        return new SMSFormatter();
    }
}
function sendNotification(factory, to, content) {
    const formatter = factory.createFormatter();
    const sender = factory.createSender();
    const formattedMessage = formatter.format(content);
    sender.send(to, formattedMessage);
}
// Client Code
sendNotification(new EmailFactory(), "mahesh@gmail.com", "Welcome!");
sendNotification(new SMSFactory(), "+919686428705", "Welcome!");
