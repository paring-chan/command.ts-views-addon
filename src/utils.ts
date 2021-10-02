import { View } from './structures'
import { MessageActionRow } from 'discord.js'

export const checkView = (obj: any) => {
  if (!(obj instanceof View)) throw new Error('This must be used in View.')
}

export const generateComponents = (view: View): MessageActionRow[] => {
  return view.components
    .filter((x) => x.length)
    .map(
      (x) =>
        new MessageActionRow({
          components: x.map((y) => y.component),
        }),
    )
}
