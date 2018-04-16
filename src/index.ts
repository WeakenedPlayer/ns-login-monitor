import { Observable } from 'rxjs';
import * as Discord from 'discord.js';
import { DISCORD_TOKEN, CENSUS_API_KEY, id2name } from './const';
import { client, connection } from 'websocket';

// constant
const url = 'wss://push.planetside2.com/streaming?environment=ps2&service-id=s:' + CENSUS_API_KEY;

let idList:string[] = [];
for( let id in id2name ) {
    idList.push( id );
}
console.log( idList );

const command = {
    "service":"event",
    "action":"subscribe",
    "worlds":["1"], // connery
    //"characters": idList,
    "eventNames":["PlayerLogin"]
};

// clients
let ws = new client();
let discordClient = new Discord.Client();
let channel: Discord.TextChannel;
let ownerId = '';

// これはひどい!!!
function getChannel() {
    return channel;
}

// setting
ws.on( 'connect', ( wsConnection: connection ) => {
    console.log( 'connected' );
    
    wsConnection.on( 'close', () => {
        console.log( 'closed' );
    } );

    wsConnection.on( 'error', ( err ) => {
        console.log( err );
    } );

    wsConnection.on( 'message', ( message: any ) => {
        // console.log( message );
        
        if( message.type === 'utf8' ) {
            let data: any = JSON.parse( message.utf8Data ); 
            
            if( data.type === 'serviceMessage' ) {
                let info: any = data.payload;
                let characterId: string = info.character_id;
                let name: string = id2name[ characterId ];
                let ch = getChannel();                
                if( ch && name ) {
                    ch.send( 'アウトフィット参加希望の'+ name + 'さんがログインしました。');
                }
            }
        }
    } );
    
    wsConnection.send( JSON.stringify( command ) );
} );

ws.on( 'connectFailed', ( evt ) => {
    console.log( evt );
} ); 

// setting
discordClient.on('ready', () => {
    console.log( 'login' );
    discordClient.fetchApplication()
    .then( apps => {
        ownerId = apps.owner.id;
    } );
    ws.connect( url );
} );

discordClient.on( 'message', ( message ) => {
    if( message.author.id !== discordClient.user.id ) {
        if( ownerId === message.author.id ) {
            if( message.content === 'start' ) {
                channel = message.channel as Discord.TextChannel;
                console.log( 'start...channel id: ' + channel.id );
            }
        }
    }
} );

// start
discordClient.login( DISCORD_TOKEN );