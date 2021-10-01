import { checkView } from './utils'
import { View, ViewItem } from './structures'
import { KViewItems } from './symbols'
import { MessageButton } from 'discord.js'

let index = 0

export const button = (
  button: MessageButton,
  deferUpdate: boolean = true,
): MethodDecorator => {
  return (target, propertyKey) => {
    checkView(target)
    let properties: ViewItem[][] = Reflect.getMetadata(KViewItems, target)

    button.setCustomId(`cts-views.${index++}`)

    const item = new ViewItem(
      button,
      Reflect.get(target, propertyKey),
      target.constructor as typeof View,
      deferUpdate,
    )

    if (properties) {
      if (!properties.length) properties.push([])

      properties[properties.length - 1].push(item)
    } else {
      properties = [[item]]
      Reflect.defineMetadata(KViewItems, properties, target)
    }
  }
}
