export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string
            DISCORD_ID: string

            VK_MUSIC_TOKEN: string
            YANDEX_MUSIC_TOKEN: string
        }
    }

    enum ButtonStyle {
        Primary = 1,
        Secondary = 2,
        Success = 3,
        Danger = 4,
        Link = 5,
    }

    enum ActivityType {
        Playing = 0,
        Streaming = 1,
        Listening = 2,
        Watching = 3,
        Custom = 4,
        Competing = 5,
    }

    enum GatewayIntentBits {
        Guilds = 1,
        GuildMembers = 2,
        GuildModeration = 4,
        GuildBans = 4,
        GuildEmojisAndStickers = 8,
        GuildIntegrations = 16,
        GuildWebhooks = 32,
        GuildInvites = 64,
        GuildVoiceStates = 128,
        GuildPresences = 256,
        GuildMessages = 512,
        GuildMessageReactions = 1024,
        GuildMessageTyping = 2048,
        DirectMessages = 4096,
        DirectMessageReactions = 8192,
        DirectMessageTyping = 16384,
        MessageContent = 32768,
        GuildScheduledEvents = 65536,
        AutoModerationConfiguration = 1048576,
        AutoModerationExecution = 2097152,
    }
}
