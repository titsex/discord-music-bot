import { config } from 'dotenv'
config()

import distubeErrorHandler from '@handler/music/error'
import addQueueHandler from '@handler/music/addQueue'
import finishHandler from '@handler/music/finish'
import emptyHandler from '@handler/music/empty'

import interactionHandler from '@handler/discord/interaction'
import discordErrorHandler from '@handler/discord/error'
import readyHandler from '@handler/discord/ready'

import DeezerPlugin from '@distube/deezer'

import { YandexMusicPlugin } from 'distube-yandex-music-plugin'
import { VKMusicPlugin } from 'distube-vk-music-plugin'
import { YtDlpPlugin } from '@distube/yt-dlp'

import { fetchCommands, reGeneratePlayer } from '@utils'
import { Client, GatewayIntentBits } from 'discord.js'
import { Cookie } from '@distube/ytdl-core'
import { CustomClient } from '@types'
import { DisTube } from 'distube'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
}) as CustomClient

export const messages = new Map<string, string>()

const start = async () => {
    const commandsPath = join(__dirname, 'modules')
    const commands = await fetchCommands(commandsPath)

    client.distube = new DisTube(client, {
        youtubeCookie: JSON.parse(readFileSync('youtube-cookie.json', 'utf8')) as Cookie[],
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        emptyCooldown: 0,
        plugins: [
            new DeezerPlugin(),
            new VKMusicPlugin({ token: process.env.VK_MUSIC_TOKEN! }),
            new YandexMusicPlugin({ oauthToken: process.env.YANDEX_MUSIC_TOKEN! }),
            new YtDlpPlugin(),
        ],
    })

    client.distube.on('error', distubeErrorHandler)
    client.distube.on('playSong', reGeneratePlayer)
    client.distube.on('addSong', addQueueHandler)
    client.distube.on('addList', addQueueHandler)
    client.distube.on('finish', finishHandler)
    client.distube.on('empty', emptyHandler)

    client.on('interactionCreate', interactionHandler(commands, client))
    client.on('ready', readyHandler(commands))
    client.on('error', discordErrorHandler)

    await client.login(process.env.DISCORD_TOKEN)
}

start()
