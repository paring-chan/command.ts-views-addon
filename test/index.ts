import { CommandClient } from '@pikokr/command.ts'
import { Client, Intents, IntentsString } from 'discord.js'
import { settings } from './settings'

const client = new Client({
  intents: Object.keys(Intents.FLAGS) as IntentsString[],
})

const cts = new CommandClient({
  client,
  command: {
    prefix: '!!',
  },
})

cts.registry.loadModulesIn('modules')

client.login(settings.token)
