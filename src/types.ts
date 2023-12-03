import { Client, GuildMember, InteractionResponse, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { DisTube } from 'distube'

export class CustomClient extends Client {
    distube!: DisTube
}

export enum COLORS {
    NONE = '\x1b[0',
    CYAN = '\x1b[36',
    RED = '\x1b[31',
    YELLOW = '\x1b[33',
}

export enum PLAYER_CUSTOM_IDS {
    START_SONG_AGAIN = 'player-start-song-again',
    PREVIOUS = 'player-previous',
    TOGGLE_PLAY_MODE = 'player-toggle-play-mode',
    NEXT = 'player-next',
    TOGGLE_REPEAT_MODE = 'player-toggle-repeat-mode',

    SPEED_DOWN = 'player-speed-down',
    VOLUME_DECREASE = 'player-volume-decrease',
    STOP = 'player-stop',
    VOLUME_INCREASE = 'player-volume-increase',
    SPEED_UP = 'player-speed-up',

    TOGGLE_FILTER = 'player-toggle-filter',
}

export enum COLOR_TYPES {
    NONE = 'm',
    BOLD = ';1m',
}

export interface ICommand {
    type?: CommandType
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
    execute: (interaction: CustomInteraction, client: CustomClient, member?: GuildMember) => unknown
}

export interface CustomInteraction extends ChatInputCommandInteraction {
    send: (message: string) => Promise<void | InteractionResponse>
}

export type CommandType = 'music'
