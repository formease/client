export const templates = {
  createProject:
    '<form>' +
    '<input type="text" placeholder="Enter Project name" class="swal2-input entered-project-name" aria-required="true"/>' +
    '<input type="text" placeholder="Enter Project Description" class="swal2-input entered-project-description"/>' +
    '<br><br>' +
    '<label for="google-support" class="popup-label">Google Drive support</label>' +
    '<input type="checkbox" id="google-support"/>' +
    '<br>' +
    '<label for="discord-webhook-support" class="popup-label">Discord Webhook support</label>' +
    '<input type="checkbox" id="discord-webhook-support"/>' +
    '</form>',
  dark: `<span class="material-icons-outlined material-icons">
    dark_mode
    </span>`,
  light: `<span class="material-icons-outlined material-icons">
    light_mode
    </span>`,
}

export const mainInsert = (data) => {
  const displayElem = `<article class="project-dashboard hidden" data-project-for="${
    data.projectName
  }" role="tabpanel"><div class="project__details"><h2>${
    data.projectName
  }</h2><p class="description">${
    data.projectDescription
  }</p></div><div class="project__functions"><button class="project__editBtn" title="Edit project details" aria-label="Edit details for project" data-projectEdit-btn> <span class="material-icons-outlined material-icons">edit</span></button><button class="project__deleteBtn" title="Delete project"  aria-label="Delete this project"data-projectDelete-btn><span class="material-icons-outlined material-icons">delete</span></button></div><div class="project__main">${
    data['Google Support']
      ? `<label for="google-link">Spreadsheet link</label><input type="url" class="google-link" id="google-link" value="${'And example of link'}"disabled><button class="copy-btn" aria-label="Copy the spreadsheet link" data-copy-btn>Copy link</button>`
      : ''
  }${
    data['Discord Webhook Support']
      ? `<label for="discord-webhook-link">Webhook link</label><input type="password" class="discord-webhook-link" id="discord-webhook-link" value="${data.discordWebhook}" disabled><button class="inp-mode-btn" aria-label="Show/hide discord webhook link" data-inp-mode-btn>Show link</button>`
      : ''
  }</div></article>`
  return displayElem
}
