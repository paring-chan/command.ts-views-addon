import { CommandClient } from '@pikokr/command.ts'
import { ViewsModule } from './structures/ViewsModule'

export function setup(cts: CommandClient) {
  cts.registry.registerModule(new ViewsModule(cts))
}
