/**
 * One name per module, everywhere it is listed.
 *
 * Every module is named "Noregna <Product>" in the dictionary. Lists that
 * cannot afford the prefix (the services index, the footer, the home cards)
 * show the product word on its own, so "Fremdrift" on the home page lands on
 * "Fremdrift" in the services index rather than on its tagline
 * ("Oppdragsstyring"), which read as a different thing.
 */
export function shortName(name: string): string {
  return name.replace(/^Noregna\s+/i, "");
}
