import { BuiltInModule, CommandClient, listener } from '@pikokr/command.ts'
import { Interaction } from 'discord.js'
import { ViewRegistry } from './ViewRegistry'

export class ViewsModule extends BuiltInModule {
  constructor(private cts: CommandClient) {
    super()
  }

  @listener('interactionCreate')
  async interaction(i: Interaction) {
    if (!i.isMessageComponent()) return
    const view = ViewRegistry.views.find((x) =>
      x.components.find((y) =>
        y.find((z) => z.component.customId === i.customId),
      ),
    )
    if (!view) return
    const component = view.components
      .find((x) => x.find((y) => y.component.customId === i.customId))
      ?.find((x) => x.component.customId === i.customId)
    if (!component) return
    try {
      if (component.deferUpdate) await i.deferUpdate()
      component.execute.bind(view)(i)
    } catch (e: any) {
      return this.cts.client.emit('uiFailed', e, component)
    }
  }
}
