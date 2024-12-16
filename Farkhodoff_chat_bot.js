const TelegramBot = require('node-telegram-bot-api');

// Bot tokenini bu yerga qo'ying
const token = '7600786853:AAFLaWqtujf6uEO6OM9uyUD_gStiipKrYwg';
const bot = new TelegramBot(token, {polling: true});

// Adminning Telegram ID raqamini bu yerga qo'ying
const adminId = '5207401088';

// Foydalanuvchilar xabarlarini saqlash uchun obyekt
const userMessages = {};

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (chatId.toString() === adminId) {
    // Admin xabar yubormoqda
    const [userId, ...replyMessage] = text.split(' ');
    const replyText = replyMessage.join(' ');
    
    if (userMessages[userId]) {
      bot.sendMessage(userId, replyText);
      bot.sendMessage(adminId, `Xabar yuborildi: ${userId} ga`);
      delete userMessages[userId]; // Javob yuborilgandan so'ng xabarni o'chirish
    } else {
      bot.sendMessage(adminId, `Xatolik: ${userId} foydalanuvchisi topilmadi`);
    }
  } else {
    // Oddiy foydalanuvchi xabar yubormoqda
    userMessages[chatId] = text;
    bot.sendMessage(chatId, "Xabaringiz qabul qilindi. Tez orada javob qaytaramiz.");
    bot.sendMessage(adminId, `Yangi xabar:\nID: ${chatId}\nXabar: ${text}`);
  }
});

console.log('Bot ishga tushdi');

