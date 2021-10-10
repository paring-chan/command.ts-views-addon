import { KViewItems } from '../symbols'
import { ViewItem } from './ViewItem'
import { ViewRegistry } from './ViewRegistry'
import { MessageActionRowComponent } from 'discord.js'
import { v4 } from 'uuid'

export class View {
  constructor() {
    this.components = Reflect.getMetadata(KViewItems, this) || []
    this.components = this.components.map(x => (
      x.map(y => {
        const i: MessageActionRowComponent = new (y.component.constructor as any)(y.component)

        i.setCustomId(y.component.customId + v4())

        return new ViewItem(i, y.execute, y.view, y.deferUpdate)
      })
    ))
    ViewRegistry.views.push(this)
  }

  stop() {
    ViewRegistry.views = ViewRegistry.views.filter(x=>x !== this)
  }

  components: ViewItem[][]
}
