import flixGrammar from './flix.tmLanguage.json'
import zigGrammar from './zig.tmLanguage.json'
import gleamGrammar from './gleam.tmLanguage.json'

export const flix = {
  id: 'flix',
  scopeName: 'source.flix',
  grammar: flixGrammar,
  aliases: ['flix'],
}

export const zig = {
  id: 'zig',
  scopeName: 'source.zig',
  grammar: zigGrammar,
  aliases: ['zig'],
}

export const gleam = {
  id: 'gleam',
  scopeName: 'source.gleam',
  grammar: gleamGrammar,
  aliases: ['gleam', 'gl'],
}
