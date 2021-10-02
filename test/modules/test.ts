import { command, listener, Module } from '@pikokr/command.ts'
import {
  ButtonInteraction,
  Message,
  MessageButton,
  MessageSelectMenu,
  SelectMenuInteraction,
} from 'discord.js'
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
  })
  async secondary(i: ButtonInteraction) {
    await i.reply('SECONDARY')
  }

  @uiComponent(
    new MessageSelectMenu().addOptions(
      {
        value: '1',
        label: '와아',
      },
      {
        value: '2',
        label: '와아아',
      },
      {
        value: '3',
        label: '와아아아',
      },
    ),
    {
      newLine: true,
      deferUpdate: false,
    },
  )
  async select(i: SelectMenuInteraction) {
    await i.reply(i.values.join(', '))
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
