import flixGrammar from './flix.tmLanguage.json'

export const langs = [
  {
    name: 'flix',
    scopeName: 'source.flix',
    ...flixGrammar,
  },
]
