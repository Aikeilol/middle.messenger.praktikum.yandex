import * as Handlebars from "handlebars"


export const handlebarsCompiler = (template: string, context?: Record<string, string | number>) => {
  const compile = Handlebars.compile(template)
  const result = compile(context)

  return result
}
