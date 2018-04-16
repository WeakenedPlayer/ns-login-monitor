import { Observable } from 'rxjs';
import * as Discord from 'discord.js';
import { DISCORD_TOKEN, CENSUS_API_KEY } from './const';

let client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(  DISCORD_TOKEN ).then( ()=>{
    console.log( 'login succeeded...');
}, ( err ) => {
    console.log( 'login failed...');
    console.log( err );
} );


client.on( 'message', ( msg: Discord.Message ) => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
} );

//const Discord = require('discord.js');
//const client = new Discord.Client();
//
//client.on('ready', () => {
//  console.log(`Logged in as ${client.user.tag}!`);
//});
//

//
//client.login('MzM4MzU4Nzk4MDY0NDE4ODE4.DbYCsQ.5RuWmhP8OhvOtoKmhaxqnWJ-_1k');