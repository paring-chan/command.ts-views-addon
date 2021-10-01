import { KViewItems } from '../symbols'
import { ViewItem } from './ViewItem'
import { ViewRegistry } from './ViewRegistry'

export class View {
  constructor() {
    ViewRegistry.views.push(this)
  }

  get components(): ViewItem[][] {
    return Reflect.getMetadata(KViewItems, this) || []
  }
}
