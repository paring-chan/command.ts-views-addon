import { MessageActionRowComponent } from 'discord.js'
import { View } from './View'

export class ViewItem {
  constructor(
    public component: MessageActionRowComponent,
    public execute: Function,
    public view: typeof View,
    public deferUpdate: boolean,
  ) {}
}
