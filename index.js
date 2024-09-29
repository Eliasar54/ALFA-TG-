import { Telegraf } from 'telegraf';
import readline from 'readline';
import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const mostrarTutorial = () => {
    console.log(chalk.yellowBright("\nTutorial para obtener el token de bot de Telegram:"));
    console.log("1. Abre Telegram y busca 'BotFather'.");
    console.log("2. Inicia una conversación con BotFather y sigue las instrucciones para crear un nuevo bot.");
    console.log("3. Una vez creado, copia el token generado y pégalo cuando se solicite.\n");
};

const pedirToken = () => {
    return new Promise((resolve) => {
        rl.question("Por favor, ingresa tu token de bot de Telegram: ", (token) => {
            resolve(token.trim());
        });
    });
};

const validarToken = async (token) => {
    try {
        const bot = new Telegraf(token);
        await bot.telegram.getMe();  // Intenta conectarte a la API de Telegram con el token proporcionado
        console.log(chalk.greenBright("Token válido. Iniciando el bot...\n"));
        return true;
    } catch (error) {
        console.log(chalk.redBright("Token inválido. Intenta nuevamente.\n"));
        return false;
    }
};

const mostrarMenu = async () => {
    let lineM = '┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅';
    console.log(`┏${lineM}
┋ ${chalk.blueBright('┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.blueBright('┋')} ${chalk.blue.bgBlue.bold.cyan('ESCOGE UN NÚMERO ')}
┋ ${chalk.blueBright('┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.blueBright('┏┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.green.bgMagenta.bold.yellow('¿QUÉ DESEA HACER?')}
┋ ${chalk.bold.redBright('⇢  Opción 1:')} ${chalk.greenBright('COMO OBTENER EL TOKEN')}
┋ ${chalk.bold.redBright('⇢  Opción 2:')} ${chalk.greenBright('INGRESA EL TOKEN DIRECTAMENTE.')}
┋ ${chalk.blueBright('┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┋ ${chalk.italic.magenta('Escriba sólo el número de')}
┋ ${chalk.italic.magenta('la opción para conectarse.')}
┗${lineM}`);
};

const obtenerToken = async () => {
    while (true) {
        await mostrarMenu();
        
        const opcion = await new Promise((resolve) => {
            rl.question(chalk.bold.magentaBright('---> '), (input) => {
                resolve(input.trim());
            });
        });

        if (opcion === '1') {
            mostrarTutorial();
            await new Promise(resolve => setTimeout(resolve, 3000));  // Espera 3 segundos después del tutorial
        }

        if (opcion === '2') {
            const token = await pedirToken();
            const esValido = await validarToken(token);

            if (esValido) {
                return token;
            }
        } else if (opcion !== '1' && opcion !== '2') {
            console.log(chalk.redBright("Opción no válida. Por favor, selecciona 1 o 2.\n"));
        }
    }
};

const iniciarBot = async () => {
    const token = await obtenerToken();
    
    // Mostrar los mensajes una vez que el token es válido
    console.log(chalk.blue('Iniciando✨...'));
    console.log(gradient.pastel.multiline(figlet.textSync('Alfa TG', { horizontalLayout: 'default' })));
    console.log(chalk.green('CREADOR EliasarYT: puro nica papa'));

    const bot = new Telegraf(token);

    // Comando /start
    bot.start((ctx) => {
        ctx.reply('¡Hola! Soy tu Alfa TG usa /menu.');
    });

bot.command('messi', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/messi?apikey=${AkiraApi}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes una imagen de Messi.' });
    await ctx.reply('¿Quieres ver la imagen de nuevo?', Markup.inlineKeyboard([
      Markup.button.callback('Siguiente', 'send_messi')
    ]));
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar enviarte la imagen.');
  }
});

bot.action('send_messi', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/messi?apikey=${AkiraApi}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes otra vez la imagen de Messi.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar enviarte la imagen de nuevo.');
  }
});



bot.command('ia', async (ctx) => {
  const userMessage = ctx.message.text.split(' ').slice(1).join(' ') || 'Hola';
  try {
    const apiUrlAkira = `https://www.akira-host.store/api/chatgpt?text=${encodeURIComponent(userMessage)}&prompt=Deberas%20actuar%20como%20Alfa-TG%20y%20ser%C3%A1s%20la%20inteligencia%20artifical%20de%20Api%20EliasarYT,%20una%20api%20para%20bots%20de%20WhatsApp,%20telegram%20u%20otras%20plataformas%20que%20lo%20permitan.%20Tu%20proporcionas%20informacion%20sobre%20diversos%20temas%20utilizando%20el%20modelo%20de%20gpt%20de%20openAI.%20Cuando%20te%20presentes%20debes%20usar%20Alfa-TG%20y%20ser%20comico-insulton%20(sarcastico)%20con%20la%20personas&apikey=${AkiraApi}`;
    const response = await axios.get(apiUrlAkira);
    if (response.data && response.data.status === true) {
      await ctx.reply(response.data.resultado);
    } else {
      throw new Error('Error en la respuesta de la API Akira');
    }
  } catch (error) {
    try {
      const apiUrlDorratz = `https://api.dorratz.com/ai/gpt4?username=diego&query=${encodeURIComponent(userMessage)}`;
      const responseDorratz = await axios.get(apiUrlDorratz);
      if (responseDorratz.data && responseDorratz.data.status === true) {
        await ctx.reply(responseDorratz.data.msg);
      } else {
        throw new Error('Error en la respuesta de la API Dorratz');
      }
    } catch (error) {
      ctx.reply('Ocurrió un error al conectarse con ambas APIs.');
    }
  }
});



// Comando /play para descargar un video de YouTube
bot.command('play', async (ctx) => {
  const videoUrl = ctx.message.text.split(' ')[1]; // Obtener la URL de YouTube proporcionada por el usuario
  if (!videoUrl) return ctx.reply('Por favor, proporciona una URL de YouTube. Ejemplo: /play https://youtu.be/JLWRZ8eWyZo');

  try {
    // Construir la URL de descarga del video utilizando el enlace de YouTube proporcionado
    const downloadUrl = `https://www.akira-host.store/api/v2/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${AkiraApi}`;

    // Tratar la URL como una descarga directa de video
    await ctx.replyWithVideo({ url: downloadUrl }, { caption: `🎬 Video descargado de: ${videoUrl}` });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar descargar el video.');
  }
});

bot.command('serchst', async (ctx) => {
  const userMessage = ctx.message.text.split(' ')[1];
  if (!userMessage) return ctx.reply('Por favor, proporciona un texto para buscar stickers. Ejemplo: /serchst flores');
  try {
    const apiUrl = `https://www.akira-host.store/api/stickersearch?text=${encodeURIComponent(userMessage)}&apikey=${AkiraApi}`;
    const response = await axios.get(apiUrl);
    if (response.data && response.data.status === true && response.data.resultado.sticker_url.length > 0) {
      const stickerUrl = response.data.resultado.sticker_url[0];
      await ctx.replyWithPhoto({ url: stickerUrl }, { caption: `🖼️ Sticker: ${response.data.resultado.title}` });
    } else ctx.reply('No pude encontrar stickers para ese texto. Intenta con otro término.');
  } catch (error) {
    ctx.reply('Ocurrió un error al conectarse con la API.');
  }
});
// Evento para dar la bienvenida a los nuevos miembros
bot.on('new_chat_members', async (ctx) => {
  const newMembers = ctx.message.new_chat_members;
  for (const member of newMembers) {
    try {
      const profilePics = await ctx.telegram.getUserProfilePhotos(member.id);

      // Verifica si el usuario tiene fotos de perfil
      if (profilePics.total_count > 0) {
        const fileId = profilePics.photos[0][0].file_id; // Obtener la primera foto de perfil
        await ctx.replyWithPhoto(fileId, { caption: `🎉 ¡Bienvenido/a, ${member.first_name}!` });
      } else {
        // Si el usuario no tiene fotos de perfil
        await ctx.reply(`🎉 ¡Bienvenido/a, ${member.first_name}!`);
      }
    } catch (error) {
      console.log('Error al obtener la foto de perfil:', error);
      await ctx.reply(`🎉 ¡Bienvenido/a, ${member.first_name}!`);
    }
  }
});

// Evento para despedir a los usuarios que salen del grupo
bot.on('left_chat_member', async (ctx) => {
  const member = ctx.message.left_chat_member;
  try {
    const profilePics = await ctx.telegram.getUserProfilePhotos(member.id);

    // Verifica si el usuario tiene fotos de perfil
    if (profilePics.total_count > 0) {
      const fileId = profilePics.photos[0][0].file_id; // Obtener la primera foto de perfil
      await ctx.replyWithPhoto(fileId, { caption: `👋 ¡Adiós, ${member.first_name}!` });
    } else {
      // Si el usuario no tiene fotos de perfil
      await ctx.reply(`👋 ¡Adiós, ${member.first_name}!`);
    }
  } catch (error) {
    console.log('Error al obtener la foto de perfil:', error);
    await ctx.reply(`👋 ¡Adiós, ${member.first_name}!`);
  }
});

// Comando /CR7 para enviar una imagen de Cristiano Ronaldo
bot.command('CR7', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/cristianoronaldo?apikey=EliasarYT`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes una imagen de CR7.' });
    await ctx.reply('¿Quieres ver otra imagen de CR7?', Markup.inlineKeyboard([
      Markup.button.callback('Siguiente', 'send_cr7')
    ]));
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar enviarte la imagen.');
  }
});

bot.action('send_cr7', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/cristianoronaldo?apikey=EliasarYT`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes otra imagen de CR7.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar enviarte la imagen de nuevo.');
  }
});

bot.command('dalle', async (ctx) => {
  const userPrompt = ctx.message.text.split(' ').slice(1).join(' '); // Obtener el texto después del comando
  if (!userPrompt) return ctx.reply('Por favor, proporciona un prompt. Ejemplo: /dalle Casa azul');

  try {
    // Construir la URL de la imagen utilizando el texto del usuario
    const imageUrl = `https://api.dorratz.com/v2/image-ai?prompt=${encodeURIComponent(userPrompt)}`;

    // Enviar la imagen al chat como si fuera una imagen normal
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: `Imagen generada para: ${userPrompt}` });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar generar la imagen.');
  }
});

bot.command('kick', async (ctx) => {
  // Verifica si el comando es enviado en un grupo
  if (!ctx.chat || (ctx.chat.type !== 'group' && ctx.chat.type !== 'supergroup')) {
    return ctx.reply('Este comando solo se puede usar en grupos.');
  }

  try {
    // Verifica si el bot es administrador
    const botMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.botInfo.id);
    if (botMember.status !== 'administrator') {
      return ctx.reply('Necesito ser administrador para expulsar usuarios.');
    }

    // Verifica si el usuario que envió el comando es administrador
    const userMember = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
    if (userMember.status !== 'administrator' && userMember.status !== 'creator') {
      return ctx.reply('Solo los administradores pueden expulsar usuarios.');
    }

    // Verifica si se mencionó a un usuario o se está respondiendo a uno
    let userToKick;
    if (ctx.message.reply_to_message) {
      userToKick = ctx.message.reply_to_message.from.id;
    } else if (ctx.message.entities && ctx.message.entities[0].type === 'mention') {
      const username = ctx.message.text.split(' ')[1].replace('@', '');
      const mentionedUser = await ctx.telegram.getChatMember(ctx.chat.id, username);
      userToKick = mentionedUser.user.id;
    } else {
      return ctx.reply('Debes mencionar al usuario que deseas expulsar o responder a uno de sus mensajes.');
    }

    // Expulsar al usuario mencionado o citado
    await ctx.telegram.kickChatMember(ctx.chat.id, userToKick);
    ctx.reply('El usuario ha sido expulsado.');
  } catch (error) {
    console.log('Error al intentar expulsar al usuario:', error);
    ctx.reply('Ocurrió un error al intentar expulsar al usuario.');
  }
});

bot.command('menu', async (ctx) => {
  const videoUrl = 'https://f.uguu.se/oKuQDAJu.mp4'; // URL del video

  // Menú del bot
  const menuText = `
🌟✨ Bienvenido a ALFA TG ✨🌟
╭─────────────────╮
┃  *🔹 COMANDOS DISPONIBLES 🔹*
┃──────────────────
┃ ➜ *¡Hola! /start* - Inicia el bot y descubre sus funciones.
┃ ➜ *⚽️ /messi* - Mira la mejor imagen de Messi.
┃ ➜ *⚽️ /CR7* - Disfruta la icónica imagen de CR7.
┃ ➜ *🎥 /play [URL]* - Descarga videos de YouTube fácilmente.
┃ ➜ *🖼️ /serchst [texto]* - Busca y comparte stickers increíbles.
┃ ➜ *🤖 /ia [pregunta]* - Chatea con nuestra Inteligencia Artificial.
┃ ➜ *🎨 /dalle [texto]* - Genera imágenes sorprendentes.
┃ ➜ *📌 /pinterest [texto]* - Encuentra inspiración en Pinterest.
┃ ➜ *📱 /apkdl [nombre]* - Descarga APKs de aplicaciones populares.
┃ ➜ *🌦️ /clima [ciudad]* - Obtén el clima actual de cualquier ciudad.
╰─────────────────╯`;

  try {
    // Enviar el video como gif con audio
    await ctx.replyWithVideo({ url: videoUrl }, { caption: menuText });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar enviar el video del menú.');
  }
});

bot.command('yts', async (ctx) => {
  const query = ctx.message.text.split(' ').slice(1).join(' ');

  if (!query) {
    return ctx.reply('Por favor, proporciona el término de búsqueda. Uso: /yts <término>');
  }

  try {
    const response = await axios.get(`https://api.dorratz.com/ytdl/yts?query=${encodeURIComponent(query)}`);

    const results = response.data.results;

    if (results.length === 0) {
      return ctx.reply('No se encontraron resultados.');
    }

    // Generar la respuesta con los primeros 5 resultados
    let message = `Resultados de búsqueda para "${query}":\n\n`;

    results.slice(0, 5).forEach((result, index) => {
      message += `${index + 1}. [${result.title}](https://www.youtube.com/watch?v=${result.videoId})\n`;
      message += `   Publicado hace: ${result.published}\n\n`;
    });

    ctx.replyWithMarkdown(message);

  } catch (error) {
    console.error(error);
    ctx.reply('Ocurrió un error al intentar obtener los resultados de la búsqueda.');
  }
});



// Si estás usando un módulo de ES, necesitas configurar el bot correctamente.
// Crear carpeta temporal si no existe


// Comando para descargar APK
bot.command('apkdl', async (ctx) => {
  const query = ctx.message.text.split(' ').slice(1).join(' ');

  if (!query) {
    return ctx.reply('Por favor, proporciona el nombre de la aplicación. Uso: /apkdl <nombre de la aplicación>');
  }

  try {
    // Solicitar datos de APK a la API
    const apkDlResponse = await axios.get(`https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(query)}`);
    const apkData = apkDlResponse.data;

    if (!apkData.dllink) {
      return ctx.reply('No se encontró el APK o no está disponible para descargar.');
    }

    // Descargar el archivo APK
    const apkResponse = await axios({
      url: apkData.dllink,
      method: 'GET',
      responseType: 'stream'
    });

    // Guardar el archivo APK temporalmente en la carpeta tmp
    const apkPath = path.join(tmpDir, `${apkData.name}.apk`);
    const writer = fs.createWriteStream(apkPath);
    
    apkResponse.data.pipe(writer);

    // Esperar a que el archivo se termine de escribir
    writer.on('finish', async () => {
      // Enviar información de la aplicación y archivo APK al chat
      await ctx.replyWithPhoto(
        { url: apkData.icon },
        {
          caption: `Nombre: ${apkData.name}\n` +
                   `Tamaño: ${apkData.size}\n` +
                   `Paquete: ${apkData.package}\n` +
                   `Última actualización: ${apkData.lastUpdate}`
        }
      );

      await ctx.replyWithDocument({ source: apkPath, filename: `${apkData.name}.apk` });

      // Eliminar el archivo APK temporal después de enviarlo
      fs.unlinkSync(apkPath);
    });

    writer.on('error', () => {
      ctx.reply('Ocurrió un error al descargar el APK.');
    });

  } catch (error) {
    console.error(error);
    ctx.reply('Ocurrió un error al intentar obtener los datos del APK.');
  }
});

bot.command('google', async (ctx) => {
  const query = ctx.message.text.split(' ').slice(1).join(' ');

  if (!query) {
    return ctx.reply('Por favor, proporciona el término de búsqueda. Uso: /google <término>');
  }

  try {
    // Hacer la búsqueda en Google usando la API
    const googleSearchResponse = await axios.get(`https://api.dorratz.com/v2/google-search?q=${encodeURIComponent(query)}`);
    const searchResults = googleSearchResponse.data.results;

    if (searchResults.length === 0) {
      return ctx.reply('No se encontraron resultados.');
    }

    // Crear la URL de la búsqueda en Google
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // Generar la captura de pantalla de la URL de Google Search
    const screenshotUrl = `https://api.dorratz.com/ssweb?url=${encodeURIComponent(googleSearchUrl)}`;

    // Generar la respuesta con los primeros 5 resultados de búsqueda
    let message = `Resultados de búsqueda para "${query}":\n\n`;

    searchResults.slice(0, 5).forEach((result, index) => {
      message += `${index + 1}. [${result.title}](${result.link})\n`;
      message += `   Dominio: ${result.domain}\n\n`;
    });

    // Enviar el mensaje de texto con los resultados y la imagen juntos
    await ctx.replyWithPhoto(
      { url: screenshotUrl },
      { caption: message, parse_mode: 'Markdown' }
    );
  } catch (error) {
    console.error(error);
    ctx.reply('Ocurrió un error al intentar obtener los resultados de la búsqueda.');
  }
});

/*import { exec } from 'child_process';

bot.command('s', async (ctx) => {
  try {
    // Verificar si el mensaje es una respuesta a una imagen, video o GIF
    const replyMessage = ctx.message.reply_to_message;
    
    if (replyMessage && (replyMessage.photo || replyMessage.document || replyMessage.video || replyMessage.animation)) {
      let fileId;

      // Determinar si es una imagen, un video, o un GIF
      if (replyMessage.photo) {
        fileId = replyMessage.photo[replyMessage.photo.length - 1].file_id; // Obtener la foto más grande
      } else if (replyMessage.document) {
        fileId = replyMessage.document.file_id;
      } else if (replyMessage.video) {
        fileId = replyMessage.video.file_id;
      } else if (replyMessage.animation) {
        fileId = replyMessage.animation.file_id; // Para GIFs
      }

      // Obtener la URL del archivo
      const fileUrl = await ctx.telegram.getFileLink(fileId);

      // Convertir el archivo en sticker y asignar paquete y autor
      const stickerOptions = {
        png_sticker: { url: fileUrl },
        emojis: '🔥', // Emoji para el sticker
        userId: ctx.from.id, // Usuario que creó el sticker
      };

      await ctx.telegram.createNewStickerSet(ctx.from.id, 'AlfaTG_pack', 'Alfa TG', stickerOptions);
      
      await ctx.reply('¡Sticker creado exitosamente en el paquete *Alfa TG* con el autor *EliasarYT*!');

    } else {
      await ctx.reply('Responde a una imagen, video o GIF con /s para convertirlo en un sticker.');
    }
  } catch (error) {
    console.error('Error al convertir el archivo en sticker:', error);
    await ctx.reply('Ocurrió un error al convertir el archivo en un sticker.');
  }
});*/

bot.command('clima', async (ctx) => {
  const query = ctx.message.text.split(' ').slice(1).join(' ');

  if (!query) {
    return ctx.reply('Por favor, proporciona el nombre de la ciudad. Uso: /clima <nombre de la ciudad>');
  }

  try {
    // Hacer la solicitud a la API de clima
    const climaResponse = await axios.get(`https://api.dorratz.com/v2/clima-s?city=${encodeURIComponent(query)}`);
    const climaData = climaResponse.data;

    if (climaData && climaData.creator && climaData.location) {
      // Enviar los datos del clima al chat
      await ctx.reply(
        `🌍 **Ubicación:** ${climaData.location}, ${climaData.country}\n` +
        `🌤 **Clima:** ${climaData.weather}\n` +
        `🌡 **Temperatura:** ${climaData.temperature}\n` +
        `🔻 **Temperatura Mínima:** ${climaData.minimumTemperature}\n` +
        `🔺 **Temperatura Máxima:** ${climaData.maximumTemperature}\n` +
        `💧 **Humedad:** ${climaData.humidity}\n` +
        `💨 **Viento:** ${climaData.wind}`
      );
    } else {
      ctx.reply('No se encontraron datos del clima para la ciudad solicitada.');
    }

  } catch (error) {
    console.error(error);
    ctx.reply('Ocurrió un error al intentar obtener los datos del clima.');
  }
});


// Comando /pinterest para buscar una imagen en Pinterest
bot.command('pinterest', async (ctx) => {
  const userMessage = ctx.message.text.split(' ').slice(1).join(' ') || 'girl';
  try {
    const apiUrlAkira = `https://www.akira-host.store/api/pinterest?text=${encodeURIComponent(userMessage)}&apikey=${AkiraApi}`;
    const response = await axios.get(apiUrlAkira);
    
    if (response.data && response.data.status === true && response.data.resultado.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.resultado.length);
      const pinterestUrl = response.data.resultado[randomIndex];
      await ctx.replyWithPhoto({ url: pinterestUrl }, { caption: `🖼️ Aquí tienes una imagen relacionada con: ${userMessage}` });
    } else {
      throw new Error('No se encontraron imágenes en la API de Akira.');
    }
  } catch (error) {
    try {
      const apiUrlDorratz = `https://api.dorratz.com/v2/pinterest?query=${encodeURIComponent(userMessage)}`;
      const responseDorratz = await axios.get(apiUrlDorratz);
      
      if (responseDorratz.data && responseDorratz.data.status === true && responseDorratz.data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * responseDorratz.data.results.length);
        const imageUrl = responseDorratz.data.results[randomIndex].image;
        const title = responseDorratz.data.results[randomIndex].title;
        await ctx.replyWithPhoto({ url: imageUrl }, { caption: `🖼️ ${title}` });
      } else {
        ctx.reply('No pude encontrar imágenes relacionadas en la API de Dorratz.');
      }
    } catch (error) {
      ctx.reply('Ocurrió un error al conectarse con ambas APIs.');
    }
  }
});

    // Lanzar el bot
    bot.launch().then(() => {
        console.log(chalk.greenBright('El bot está en línea y listo para usarse.'));
    }).catch((err) => {
        console.error('Error al lanzar el bot:', err);
    });
};

iniciarBot();
