import flixGrammar from './flix.tmLanguage.json'
import zigGrammar from './zig.tmLanguage.json'
import gleamGrammar from './gleam.tmLanguage.json'
import racketGrammar from './racket.tmLanguage.json'

export const langs = [
  {
    id: 'flix',
    scopeName: 'source.flix',
    grammar: flixGrammar,
    aliases: ['flix'],
  },
  {
    id: 'zig',
    scopeName: 'source.zig',
    grammar: zigGrammar,
    aliases: ['zig'],
  },
  {
    id: 'gleam',
    scopeName: 'source.gleam',
    grammar: gleamGrammar,
    aliases: ['gleam', 'gl'],
  },
  {
    id: 'racket',
    scopeName: 'source.racket',
    grammar: racketGrammar,
    aliases: ['rkt'],
  },
]
