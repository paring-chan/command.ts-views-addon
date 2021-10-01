import { CommandClient, ModuleLoadError } from '@pikokr/command.ts'
import { Client, Intents, IntentsString } from 'discord.js'
import { settings } from './settings'
import { setup } from '../src'

const client = new Client({
  intents: Object.keys(Intents.FLAGS) as IntentsString[],
})

const cts = new CommandClient({
  client,
  command: {
    prefix: '!!',
  },
})

setup(cts)

cts.registry.loadModulesIn('modules').catch((e) => {
  if (e instanceof ModuleLoadError) {
    console.error(e)
  }
})

client.login(settings.token)
