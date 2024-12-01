
export function GetTextFromFile (file)  {
  return fetch(file)
    .then(response => response.text())
    .then(text => text);
}

export async function GetTextFromFileAsync (file)  {
  return await fetch(file)
    .then(response => response.text())
    .then(text => text);
}