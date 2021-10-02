import { checkView } from './utils'
import { View, ViewItem } from './structures'
import { KViewItems } from './symbols'
import { MessageActionRowComponent } from 'discord.js'

let index = 0

export const uiComponent = (
  button: MessageActionRowComponent,
  options: Partial<{ newLine: boolean; deferUpdate: boolean }> = {},
): MethodDecorator => {
  return (target, propertyKey) => {
    checkView(target)
    let properties: ViewItem[][] = Reflect.getMetadata(KViewItems, target)

    button.setCustomId(`cts-views.${index++}`)

    const item = new ViewItem(
      button,
      Reflect.get(target, propertyKey),
      target.constructor as typeof View,
      options.deferUpdate ?? true,
    )

    if (properties) {
      if (!properties.length) properties.push([])

      if (options.newLine) properties.push([])

      properties[properties.length - 1].push(item)
    } else {
      properties = [[item]]
      Reflect.defineMetadata(KViewItems, properties, target)
    }
  }
}
