// Alfa TG © 2024 EliasarYT
// Si deseas modificar o reutilizar este código, por favor mantén los créditos originales.
// Este mensaje debe permanecer intacto en todas las versiones modificadas😅.
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
        ctx.reply('¡Hola! Soy tu bot de Telegram, listo para ayudarte.');
    });

bot.command('messi', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/messi?apikey=${AkiraApi}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes una imagen de Messi.' });
    await ctx.reply('¿Quieres ver la imagen de nuevo?', Markup.inlineKeyboard([
      Markup.button.callback('Siguiente', 'send_messi')
    ]));
  } catch (error) {
    try {
      const backupImageUrl = `https://api.cafirexos.com/api/wallpaper/messi?`;
      await ctx.replyWithPhoto({ url: backupImageUrl }, { caption: '⚽ Aquí tienes una imagen de Messi (API de respaldo).' });
      await ctx.reply('¿Quieres ver la imagen de nuevo?', Markup.inlineKeyboard([
        Markup.button.callback('Siguiente', 'send_messi')
      ]));
    } catch (backupError) {
      ctx.reply('Ocurrió un error al intentar enviarte la imagen con ambas APIs.');
    }
  }
});

bot.action('send_messi', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/messi?apikey=${AkiraApi}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes otra vez la imagen de Messi.' });
  } catch (error) {
    try {
      const backupImageUrl = `https://api.cafirexos.com/api/wallpaper/messi?`;
      await ctx.replyWithPhoto({ url: backupImageUrl }, { caption: '⚽ Aquí tienes la imagen de Messi (API de respaldo).' });
    } catch (backupError) {
      ctx.reply('Ocurrió un error al intentar enviarte la imagen de nuevo con ambas APIs.');
    }
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
      const apiUrlCafirexos = `https://api.cafirexos.com/api/chatgpt?text=${encodeURIComponent(userMessage)}&prompt=Deberas%20actuar%20como%20Alfa-TG%20y%20ser%C3%A1s%20la%20inteligencia%20artifical%20de%20Api%20EliasarYT,%20una%20api%20para%20bots%20de%20WhatsApp,%20telegram%20u%20otras%20plataformas%20que%20lo%20permitan.%20Tu%20proporcionas%20informacion%20sobre%20diversos%20temas%20utilizando%20el%20modelo%20de%20gpt%20de%20openAI.%20Cuando%20te%20presentes%20debes%20usar%20Alfa-TG%20y%20ser%20comico-insulton%20(sarcastico)%20con%20la%20personas`;
      const responseCafirexos = await axios.get(apiUrlCafirexos);
      if (responseCafirexos.data && responseCafirexos.data.status === true) {
        await ctx.reply(responseCafirexos.data.resultado);
      } else {
        throw new Error('Error en la respuesta de la API Cafirexos');
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
        ctx.reply('Ocurrió un error al conectarse con todas las APIs.');
      }
    }
  }
});

// Comando /play para descargar un video de YouTube
bot.command('play', async (ctx) => {
  const videoUrl = ctx.message.text.split(' ')[1];
  if (!videoUrl) return ctx.reply('Por favor, proporciona una URL de YouTube. Ejemplo: /play https://youtu.be/JLWRZ8eWyZo');

  try {
    const downloadUrl = `https://www.akira-host.store/api/v2/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${AkiraApi}`;
    await ctx.replyWithVideo({ url: downloadUrl }, { caption: `🎬 Video descargado de: ${videoUrl}` });
  } catch (error) {
    try {
      const backupUrl = `https://api.cafirexos.com/api/v2/ytmp4?url=${encodeURIComponent(videoUrl)}`;
      await ctx.replyWithVideo({ url: backupUrl }, { caption: `🎬 Video descargado de: ${videoUrl} (API de respaldo)` });
    } catch (backupError) {
      ctx.reply('Ocurrió un error al intentar descargar el video con ambas APIs.');
    }
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
    } else {
      ctx.reply('No pude encontrar stickers para ese texto. Intenta con otro término.');
    }
  } catch (error) {
    try {
      const backupApiUrl = `https://api.cafirexos.com/api/stickersearch?text=${encodeURIComponent(userMessage)}`;
      const backupResponse = await axios.get(backupApiUrl);

      if (backupResponse.data && backupResponse.data.status === true && backupResponse.data.resultado.sticker_url.length > 0) {
        const backupStickerUrl = backupResponse.data.resultado.sticker_url[0];
        await ctx.replyWithPhoto({ url: backupStickerUrl }, { caption: `🖼️ Sticker: ${backupResponse.data.resultado.title} (API de respaldo)` });
      } else {
        ctx.reply('No pude encontrar stickers para ese texto con la API de respaldo. Intenta con otro término.');
      }
    } catch (backupError) {
      ctx.reply('Ocurrió un error al conectarse con ambas APIs.');
    }
  }
});

bot.on('chat_photo', async (ctx) => {
  const newPhoto = ctx.chat.photo.big.file_id; // Usar la foto más grande disponible
  await ctx.replyWithPhoto(newPhoto, { caption: 'La foto del grupo ha sido cambiada a:' });
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
    const imageUrl = `https://www.akira-host.store/api/wallpaper/cristianoronaldo?apikey=${AkiraApi}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes una imagen de CR7.' });
    await ctx.reply('¿Quieres ver otra imagen de CR7?', Markup.inlineKeyboard([
      Markup.button.callback('Siguiente', 'send_cr7')
    ]));
  } catch (error) {
    try {
      const backupImageUrl = `https://api.cafirexos.com/api/wallpaper/cristianoronaldo?`;
      await ctx.replyWithPhoto({ url: backupImageUrl }, { caption: '⚽ Aquí tienes una imagen de CR7 (API de respaldo).' });
      await ctx.reply('¿Quieres ver otra imagen de CR7?', Markup.inlineKeyboard([
        Markup.button.callback('Siguiente', 'send_cr7')
      ]));
    } catch (backupError) {
      ctx.reply('Ocurrió un error al intentar enviarte la imagen con ambas APIs.');
    }
  }
});

bot.action('send_cr7', async (ctx) => {
  try {
    const imageUrl = `https://www.akira-host.store/api/wallpaper/cristianoronaldo?apikey=${AkiraApi}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: '⚽ Aquí tienes otra imagen de CR7.' });
  } catch (error) {
    try {
      const backupImageUrl = `https://api.cafirexos.com/api/wallpaper/cristianoronaldo?`;
      await ctx.replyWithPhoto({ url: backupImageUrl }, { caption: '⚽ Aquí tienes otra imagen de CR7 (API de respaldo).' });
    } catch (backupError) {
      ctx.reply('Ocurrió un error al intentar enviarte la imagen de nuevo con ambas APIs.');
    }
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

const menuImageUrl = 'https://i.ibb.co/rF6Fm7S/5fd6107ef62a08c959702bf11f4fc3ce.jpg'; // URL de la imagen del menú

bot.command('menu', async (ctx) => {
  const menuText = `
ALFA TG

Comandos Generales:
- /start
- /creador
- /clima [ciudad]

Descargadores:
- /play [URL]
- /apkdl [nombre]
- /xnxxdl [URL]

Buscadores:
- /serchst [texto]
- /pinterest [texto]
- /dalle [texto]
- /yts [término]
- /google [término]

+18:
- /nsfw
- /packgirl
- /packmen
- /nsfwfoot
- /videoxxx

Admin de Grupos:
- /kick
- /del
- /toggle

Interacción:
- /ia [pregunta]
- /messi
- /CR7
- /s`;

  try {
    await ctx.replyWithPhoto(menuImageUrl, { caption: menuText });
  } catch (error) {
    console.error(error); // Muestra el error en la consola
    ctx.reply('Ocurrió un error al intentar enviar el menú.');
  }
});


bot.command('creador', async (ctx) => {
  const mensajeCreador = `
Creador del bot: ALFA TG
Número de contacto: +50582340051
Descripción: Para consultas o soporte técnico, puedes comunicarte con el creador.
  `;

  await ctx.reply(mensajeCreador);
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

    // Nombre de la carpeta temporal
    const tmpDir = 'tmpDir'; // Nombre de la carpeta temporal (puedes cambiarlo si lo deseas)

    // Crear la carpeta temporal si no existe
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    // Guardar el archivo APK temporalmente en la carpeta tmpDir
    const apkPath = path.join(tmpDir, `${apkData.name}.apk`);
    const writer = fs.createWriteStream(apkPath);
    
    apkResponse.data.pipe(writer);

    // Esperar a que el archivo se termine de escribir
    writer.on('finish', async () => {
      try {
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
      } catch (sendError) {
        console.error('Error al enviar mensajes:', sendError);
        ctx.reply('Ocurrió un error al intentar enviar la información del APK.');
      }
    });

    writer.on('error', (writeError) => {
      console.error('Error al escribir el archivo:', writeError);
      ctx.reply('Ocurrió un error al descargar el APK.');
    });

  } catch (error) {
    console.error('Error al obtener los datos del APK:', error);
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

const tmpDir = './tmp';

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

bot.command('s', async (ctx) => {
  try {
    const message = ctx.message;
    const replyMessage = message.reply_to_message;
    let fileId, fileType;

    if (replyMessage) {
      if (replyMessage.photo) {
        fileId = replyMessage.photo[replyMessage.photo.length - 1].file_id;
        fileType = 'photo';
      } else if (replyMessage.video || replyMessage.animation) {
        fileId = replyMessage.video ? replyMessage.video.file_id : replyMessage.animation.file_id;
        fileType = 'video';
      } else {
        return ctx.reply('Responde a una imagen, video o GIF con /s para crear un sticker.');
      }
    } else if (message.photo || message.video || message.animation) {
      fileId = message.photo
        ? message.photo[message.photo.length - 1].file_id
        : message.video
        ? message.video.file_id
        : message.animation.file_id;
      fileType = message.photo ? 'photo' : 'video';
    } else {
      return ctx.reply('Envía o responde a una imagen, video o GIF con /s para crear un sticker.');
    }

    const fileUrl = await ctx.telegram.getFileLink(fileId);
    const fileName = path.join(tmpDir, `${fileId}.${fileType === 'photo' ? 'jpg' : 'mp4'}`);
    
    const response = await axios({
      url: fileUrl.href,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(fileName);
    response.data.pipe(writer);

    writer.on('finish', async () => {
      await ctx.replyWithSticker({ source: fileName });
      fs.unlinkSync(fileName);
    });

    writer.on('error', (err) => {
      ctx.reply('Ocurrió un error al intentar descargar el archivo.');
    });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar crear el sticker.');
  }
});

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
      ctx.reply('No se encontraron datos  clima para la ciudad solicitada.');
    }

  } catch (error) {
    console.error(error);
    ctx.reply('Ocurrió un error al intentar obtener los datos del clima.');
  }
});


const commandsStatus = {};

bot.command('toggle', async (ctx) => {
  const chatId = ctx.chat.id;
  const userId = ctx.message.from.id;

  try {
    const admins = await ctx.telegram.getChatAdministrators(chatId);
    const isAdmin = admins.some(admin => admin.user.id === userId);

    if (!isAdmin) {
      return ctx.reply('Solo los administradores pueden activar o desactivar los comandos +18.');
    }

    if (!commandsStatus[chatId]) {
      commandsStatus[chatId] = false;
    }

    commandsStatus[chatId] = !commandsStatus[chatId];
    const status = commandsStatus[chatId] ? 'on' : 'off';
    ctx.reply(`Los comandos +18 están ahora ${status}.`);
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
    ctx.reply('Ocurrió un error al intentar verificar los permisos.');
  }
});

bot.command('nsfw', async (ctx) => {
  const chatId = ctx.chat.id;
  if (!commandsStatus[chatId]) {
    return ctx.reply('Los comandos +18 están desactivados. Usa /toggle para activarlos.');
  }

  try {
    const imageUrl = 'https://api.cafirexos.com/api/nsfw/nsfwcum';
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: 'Aquí tienes la imagen +18.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar obtener la imagen.');
  }
});

bot.command('packgirl', async (ctx) => {
  const chatId = ctx.chat.id;
  if (!commandsStatus[chatId]) {
    return ctx.reply('Los comandos +18 están desactivados. Usa /toggle para activarlos.');
  }

  try {
    const imageUrl = 'https://api.cafirexos.com/api/adult/packgirl';
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: 'Aquí tienes la imagen +18 de Pack Girl.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar obtener la imagen.');
  }
});

bot.command('packmen', async (ctx) => {
  const chatId = ctx.chat.id;
  if (!commandsStatus[chatId]) {
    return ctx.reply('Los comandos +18 están desactivados. Usa /toggle para activarlos.');
  }

  try {
    const imageUrl = 'https://api.cafirexos.com/api/adult/packmen';
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: 'Aquí tienes la imagen +18 de Pack Men.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar obtener la imagen.');
  }
});

bot.command('nsfwfoot', async (ctx) => {
  const chatId = ctx.chat.id;

  if (!commandsStatus[chatId] || !commandsStatus[chatId]) {
    return ctx.reply('Los comandos +18 están desactivados. Usa /toggle para activarlos.');
  }

  try {
    const imageUrl = 'https://api.cafirexos.com/api/nsfw/nsfwfoot';
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: 'Aquí tienes la imagen +18 de NSFW Foot.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar obtener la imagen.');
  }
});

bot.command('videoxxx', async (ctx) => {
  const chatId = ctx.chat.id;

  if (!commandsStatus[chatId] || !commandsStatus[chatId]) {
    return ctx.reply('Los comandos +18 están desactivados. Usa /toggle para activarlos.');
  }

  try {
    const videoUrl = 'https://api.cafirexos.com/api/adult/videoxxx';
    await ctx.replyWithVideo({ url: videoUrl }, { caption: 'Aquí tienes el video +18.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar obtener el video.');
  }
});

bot.command('xnxxdl', async (ctx) => {
  const chatId = ctx.chat.id;

  if (!commandsStatus[chatId]) {
    return ctx.reply('Los comandos +18 están desactivados. Usa /toggle para activarlos.');
  }

  const args = ctx.message.text.split(' ').slice(1);
  if (args.length === 0) {
    return ctx.reply('Por favor, proporciona una URL de un video de XNXX para descargar.');
  }

  const videoUrl = args[0];

  try {
    const apiUrl = `https://api.cafirexos.com/api/xnxxdl?url=${encodeURIComponent(videoUrl)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status && data.result.files) {
      const files = data.result.files;
      const keys = Object.keys(files);
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const videoFileUrl = files[randomKey];

      const videoTitle = data.result.title;
      const thumbnailUrl = data.result.image;

      // Descarga el video
      const videoResponse = await axios.get(videoFileUrl, { responseType: 'arraybuffer' });
      
      // Envía el video al usuario
      await ctx.replyWithVideo({ 
        source: Buffer.from(videoResponse.data), 
        caption: `${videoTitle}`
      });

    } else {
      ctx.reply('No se pudo obtener el video. Intenta con otra URL.');
    }
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar obtener el video.');
  }
});

bot.command('create', async (ctx) => {
  const userText = ctx.message.text.split(' ').slice(1).join('%20') || 'ALFA%TG';
  
  try {
    const imageUrl = `https://api.cafirexos.com/api/maker/ephoto360/eraser-deleting-text?text=${userText}`;
    await ctx.replyWithPhoto({ url: imageUrl }, { caption: 'Aquí está tu imagen generada.' });
  } catch (error) {
    ctx.reply('Ocurrió un error al intentar crear la imagen.');
  }
});

bot.command('del', async (ctx) => {
  if (!ctx.message.reply_to_message) {
    return ctx.reply('Responde a un mensaje para eliminarlo.');
  }

  const messageId = ctx.message.reply_to_message.message_id;
  const chatId = ctx.chat.id;

  try {
    await ctx.deleteMessage(messageId);
    ctx.reply('Mensaje eliminado.');
  } catch (error) {
    ctx.reply('No se pudo eliminar el mensaje. Asegúrate de que el bot tenga permisos.');
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
