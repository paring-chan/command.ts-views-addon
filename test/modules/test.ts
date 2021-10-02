import { command, listener, Module } from '@pikokr/command.ts'
import { ButtonInteraction, Message, MessageButton } from 'discord.js'
import { uiComponent, generateComponents, View } from '../../src'

class TestView extends View {
  @uiComponent(new MessageButton().setStyle('SUCCESS').setLabel('Test'), {
    deferUpdate: false,
  })
  async success(i: ButtonInteraction) {
    await i.reply('SUCCESS')
  }

  @uiComponent(new MessageButton().setStyle('PRIMARY').setLabel('Test2'), {
    deferUpdate: false,
  })
  async primary(i: ButtonInteraction) {
    await i.reply('PRIMARY')
  }

  @uiComponent(new MessageButton().setStyle('SECONDARY').setLabel('Test3'), {
    deferUpdate: false,
    newLine: true,
  })
  async secondary(i: ButtonInteraction) {
    await i.reply('SECONDARY')
  }
}

const view = new TestView()

class TestModule extends Module {
  load() {
    console.log('test module loaded')
  }

  @listener('commandError')
  err(err: Error) {
    console.error(err)
  }

  @command()
  async test(msg: Message) {
    await msg.reply({
      content: 'sans',
      components: generateComponents(view),
    })
  }
}

export function install() {
  return new TestModule()
}
