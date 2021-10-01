import {
  BuiltInModule,
  command,
  CommandClient,
  listener,
  ownerOnly,
} from '@pikokr/command.ts'
import { Message } from 'discord.js'

class Dev extends BuiltInModule {
  constructor(private cts: CommandClient) {
    super()
  }

  @listener('ready')
  async ready() {
    console.log(`Logged in as ${this.cts.client.user!.tag}`)
  }

  @command()
  @ownerOnly
  async reload(msg: Message) {
    await msg.react('🤔')
    const data = await this.cts.registry.reloadAll()
    await msg.react('✅')
    await msg.reply({
      content:
        '```\n' +
        data
          .map((x) => (x.success ? `✅ ${x.path}` : `❌ ${x.path}\n${x.error}`))
          .join('\n') +
        '```',
    })
  }
}

export function install(cts: CommandClient) {
  return new Dev(cts)
}
