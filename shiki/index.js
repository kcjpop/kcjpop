import flixGrammar from './flix.tmLanguage.json'
import janetGrammar from './janet.tmLanguage.json'

export const langs = [
  {
    name: 'flix',
    scopeName: 'source.flix',
    ...flixGrammar,
  },
  {
    name: 'janet',
    scopeName: 'source.janet',
    ...janetGrammar,
  },
]
