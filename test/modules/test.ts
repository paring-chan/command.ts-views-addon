import { command, Module } from '@pikokr/command.ts'
import { ButtonInteraction, Message, MessageButton } from 'discord.js'
import { button, generateComponents, View } from '../../src'

class TestView extends View {
  @button(new MessageButton().setStyle('SUCCESS').setLabel('Test'), false)
  async success(i: ButtonInteraction) {
    await i.reply('SUCCESS')
  }

  @button(new MessageButton().setStyle('PRIMARY').setLabel('Test2'), false)
  async primary(i: ButtonInteraction) {
    await i.reply('PRIMARY')
  }

  @button(new MessageButton().setStyle('SECONDARY').setLabel('Test3'), false)
  async secondary(i: ButtonInteraction) {
    await i.reply('SECONDARY')
  }
}

const view = new TestView()

class TestModule extends Module {
  load() {
    console.log('test module loaded')
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
