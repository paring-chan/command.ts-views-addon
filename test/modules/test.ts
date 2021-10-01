import { Module } from '@pikokr/command.ts'

class TestModule extends Module {
  load() {
    console.log('test module loaded')
  }
}

export function install() {
  return new TestModule()
}
